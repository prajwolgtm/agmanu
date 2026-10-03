from __future__ import annotations

import json
from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[2]
CATALOGUE = ROOT / "catalogue"
ASSETS = CATALOGUE / "assets"
DATA = CATALOGUE / "data" / "products.json"
OUTPUT = ROOT / "output" / "pdf" / "AG-Manufacturing-LOADED-Product-Catalogue.pdf"
TMP = ROOT / "tmp" / "pdfs"

PAGE_W, PAGE_H = landscape(A4)

INK = HexColor("#101216")
CHARCOAL = HexColor("#171A20")
MUTED = HexColor("#636A75")
PALE = HexColor("#F3F4F6")
LINE = HexColor("#D9DDE3")
GOLD = HexColor("#F5B800")
BLUE = HexColor("#0B4CAD")
CYAN = HexColor("#18A8C9")
GREEN = HexColor("#179A68")
ORANGE = HexColor("#E77720")
RED = HexColor("#C93636")


def wrap_lines(text: str, font: str, size: float, max_width: float) -> list[str]:
    words = text.split()
    if not words:
        return [""]
    lines: list[str] = []
    current = words[0]
    for word in words[1:]:
        candidate = f"{current} {word}"
        if stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
            lines.append(current)
            current = word
    lines.append(current)
    return lines


def draw_wrapped(c: canvas.Canvas, text: str, x: float, y: float, width: float,
                 font: str = "Helvetica", size: float = 9, leading: float = 12,
                 color=INK, max_lines: int | None = None) -> float:
    c.setFont(font, size)
    c.setFillColor(color)
    lines = wrap_lines(text, font, size, width)
    if max_lines:
        lines = lines[:max_lines]
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_image_contain(c: canvas.Canvas, path: Path, x: float, y: float,
                       width: float, height: float, pad: float = 0) -> None:
    with PILImage.open(path) as image:
        iw, ih = image.size
    scale = min((width - 2 * pad) / iw, (height - 2 * pad) / ih)
    rw, rh = iw * scale, ih * scale
    c.drawImage(str(path), x + (width - rw) / 2, y + (height - rh) / 2,
                rw, rh, mask="auto", preserveAspectRatio=True)


def crop_transparent_logo(source: Path, target: Path) -> Path:
    target.parent.mkdir(parents=True, exist_ok=True)
    with PILImage.open(source).convert("RGBA") as image:
        alpha = image.getchannel("A")
        bbox = alpha.getbbox()
        if bbox:
            image = image.crop(bbox)
        image.thumbnail((1200, 420), PILImage.Resampling.LANCZOS)
        image.save(target)
    return target


def page_base(c: canvas.Canvas, page_no: int, section: str, dark: bool = False) -> None:
    c.setFillColor(CHARCOAL if dark else white)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    if not dark:
        c.setFillColor(GOLD)
        c.rect(0, PAGE_H - 8, PAGE_W, 8, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(Color(1, 1, 1, alpha=0.65) if dark else MUTED)
    c.drawString(32, 18, "A.G. MANUFACTURING AND TRADING PVT. LTD.  /  LOADED")
    c.drawRightString(PAGE_W - 44, 18, f"{section.upper()}   {page_no:02d} / 08")


def section_title(c: canvas.Canvas, index: str, kicker: str, title: str, subtitle: str) -> None:
    c.setFillColor(GOLD)
    c.roundRect(32, PAGE_H - 70, 34, 22, 11, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(49, PAGE_H - 62, index)
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(78, PAGE_H - 53, kicker.upper())
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 23)
    c.drawString(78, PAGE_H - 78, title)
    draw_wrapped(c, subtitle, 78, PAGE_H - 94, 700, size=8.5, leading=10.5, color=MUTED)


def draw_table(c: canvas.Canvas, x: float, y_top: float, width: float,
               rows: list[dict], row_height: float = 29, accent=GOLD,
               font_size: float = 7.5) -> float:
    columns = [
        ("PRODUCT / SKU", 0.31),
        ("VISCOSITY", 0.16),
        ("PERFORMANCE", 0.22),
        ("AVAILABLE PACKS", 0.31),
    ]
    header_h = 23
    c.setFillColor(INK)
    c.roundRect(x, y_top - header_h, width, header_h, 5, stroke=0, fill=1)
    cursor_x = x
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 6.6)
    for label, ratio in columns:
        c.drawString(cursor_x + 6, y_top - 15, label)
        cursor_x += width * ratio
    y = y_top - header_h
    for idx, row in enumerate(rows):
        c.setFillColor(white if idx % 2 == 0 else PALE)
        c.rect(x, y - row_height, width, row_height, stroke=0, fill=1)
        c.setStrokeColor(LINE)
        c.line(x, y - row_height, x + width, y - row_height)
        values = [
            row["sku"],
            row["sae"],
            row["grade"],
            " / ".join(row["packs"]),
        ]
        cursor_x = x
        for col_idx, ((_, ratio), value) in enumerate(zip(columns, values)):
            cell_w = width * ratio
            font = "Helvetica-Bold" if col_idx == 0 else "Helvetica"
            color = INK if col_idx != 1 else accent
            lines = wrap_lines(value, font, font_size, cell_w - 12)[:2]
            c.setFont(font, font_size)
            c.setFillColor(color)
            line_y = y - 11
            for line in lines:
                c.drawString(cursor_x + 6, line_y, line)
                line_y -= font_size + 2
            cursor_x += cell_w
        y -= row_height
    c.setStrokeColor(LINE)
    c.roundRect(x, y, width, header_h + row_height * len(rows), 5, stroke=1, fill=0)
    return y


def product_card(c: canvas.Canvas, path: Path, x: float, y: float, width: float,
                 height: float, label: str, detail: str, accent=GOLD) -> None:
    c.setFillColor(PALE)
    c.roundRect(x, y, width, height, 10, stroke=0, fill=1)
    draw_image_contain(c, path, x + 4, y + 30, width - 8, height - 34, pad=4)
    c.setFillColor(accent)
    c.rect(x, y, 5, 30, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawString(x + 11, y + 18, label)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 6.5)
    c.drawString(x + 11, y + 8, detail)


def category(data: dict, name: str) -> dict:
    return next(item for item in data["categories"] if item["name"] == name)


def build() -> None:
    data = json.loads(DATA.read_text(encoding="utf-8"))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)
    loaded_logo = crop_transparent_logo(
        ASSETS / "brand" / "loaded-logo.png", TMP / "loaded-logo-cropped.png"
    )

    c = canvas.Canvas(str(OUTPUT), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    c.setTitle("LOADED Product Catalogue - A.G. Manufacturing and Trading Pvt. Ltd.")
    c.setAuthor("A.G. Manufacturing and Trading Pvt. Ltd.")
    c.setSubject("Price-free lubricant product SKU and specification catalogue")

    # 01 - Cover
    page_base(c, 1, "Product Catalogue", dark=True)
    c.setFillColor(GOLD)
    c.rect(0, 0, 14, PAGE_H, stroke=0, fill=1)
    c.setFillColor(Color(1, 1, 1, alpha=0.06))
    c.circle(680, 330, 250, stroke=0, fill=1)
    c.setFillColor(white)
    c.roundRect(36, PAGE_H - 86, 208, 42, 8, stroke=0, fill=1)
    draw_image_contain(c, ASSETS / "brand" / "ag-logo.png", 42, PAGE_H - 82, 34, 34)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(82, PAGE_H - 63, "A.G. MANUFACTURING")
    c.setFont("Helvetica", 7)
    c.drawString(82, PAGE_H - 75, "AND TRADING PVT. LTD.  |  NEPAL")
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(38, 430, "PRODUCT PORTFOLIO  /  2083")
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 52)
    c.drawString(36, 360, "LOADED")
    c.setFont("Helvetica-Bold", 29)
    c.drawString(36, 322, "PRODUCT CATALOGUE")
    c.setFillColor(Color(1, 1, 1, alpha=0.72))
    draw_wrapped(c,
                 "Automotive, agricultural and industrial lubricants engineered for demanding operating conditions.",
                 38, 286, 360, size=12, leading=16, color=Color(1, 1, 1, alpha=0.72))
    c.setFillColor(GOLD)
    c.roundRect(38, 224, 212, 28, 14, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(144, 234, "SKU + SPECIFICATION REFERENCE  |  NO PRICES")
    c.setFillColor(Color(1, 1, 1, alpha=0.72))
    c.setFont("Helvetica", 8)
    c.drawString(38, 178, "ENGINE  /  TRANSMISSION  /  HYDRAULIC  /  INDUSTRIAL")
    c.drawString(38, 164, "MOTORCYCLE  /  GREASE  /  COOLING  /  SERVICE FLUIDS")
    draw_image_contain(c, ASSETS / "products" / "superia-turbo-15w40.png", 490, 72, 146, 400)
    draw_image_contain(c, ASSETS / "products" / "gear-ep140.png", 610, 82, 170, 330)
    draw_image_contain(c, ASSETS / "products" / "scooter-4t-r-10w30.png", 425, 72, 120, 300)
    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(white)
    c.drawString(38, 45, "MANIGRAM  |  TILOTTAMA-5  |  RUPANDEHI  |  NEPAL")
    c.showPage()

    # 02 - Technical guide
    page_base(c, 2, "Understanding Grades")
    section_title(c, "02", "Specification guide", "Read the grade. Choose with confidence.",
                  "These codes describe viscosity, performance or consistency. Always confirm the vehicle or equipment manual before selection.")
    guides = [
        ("SAE", "Engine & gear viscosity", "The number before W describes cold-flow behavior; the second number describes viscosity at operating temperature. Example: 15W-40."),
        ("API", "Engine performance category", "S categories generally identify petrol-engine service; C categories identify diesel-engine service. Later letters usually represent newer performance levels."),
        ("JASO MA2", "Wet-clutch motorcycle suitability", "A motorcycle friction-performance classification designed for four-stroke bikes using a shared engine, gearbox and wet clutch oil system."),
        ("ISO VG", "Industrial viscosity grade", "A viscosity classification centered on the oil's kinematic viscosity at 40 C. Common examples include ISO VG 46 and ISO VG 68."),
        ("API GL", "Gear-oil service level", "GL categories indicate gear-oil performance and extreme-pressure capability. Use only the grade recommended for the transmission or axle."),
        ("NLGI", "Grease consistency", "The NLGI number describes grease consistency. NLGI 2 is a widely used, general-purpose consistency for automotive and industrial service."),
    ]
    card_w, card_h = 245, 120
    for idx, (code, title, body) in enumerate(guides):
        col, row = idx % 3, idx // 3
        x = 32 + col * (card_w + 20)
        y = 300 - row * (card_h + 20)
        c.setFillColor(PALE)
        c.roundRect(x, y, card_w, card_h, 10, stroke=0, fill=1)
        c.setFillColor([GOLD, BLUE, GREEN, ORANGE, CYAN, RED][idx])
        c.roundRect(x + 14, y + card_h - 40, 72, 24, 12, stroke=0, fill=1)
        c.setFillColor(white if idx != 0 else INK)
        c.setFont("Helvetica-Bold", 9)
        c.drawCentredString(x + 50, y + card_h - 32, code)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(x + 14, y + card_h - 58, title)
        draw_wrapped(c, body, x + 14, y + card_h - 76, card_w - 28, size=7.6, leading=10, color=MUTED, max_lines=5)
    c.setFillColor(INK)
    c.roundRect(32, 46, PAGE_W - 64, 54, 10, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(48, 79, "QUICK SELECTION RULE")
    draw_wrapped(c, "Match the viscosity and performance category stated by the equipment manufacturer. Application fit matters more than choosing the highest-looking grade.",
                 48, 63, PAGE_W - 96, size=8.5, leading=11, color=white)
    c.showPage()

    # 03 - Engine oils
    page_base(c, 3, "Engine Oils")
    section_title(c, "03", "Powertrain protection", "Engine oils for work, road and field.",
                  "A focused range for diesel fleets, petrol passenger vehicles and agricultural equipment.")
    engine_rows = category(data, "Motor Engine Oil")["products"]
    passenger_rows = category(data, "Passenger Car Engine Oil")["products"]
    agro_rows = category(data, "Agro Engine Oil")["products"]
    draw_table(c, 32, 435, 530, engine_rows + passenger_rows + agro_rows, row_height=29, accent=ORANGE, font_size=7.1)
    product_card(c, ASSETS / "products" / "superia-turbo-15w40.png", 585, 302, 102, 154, "15W-40", "Heavy-duty diesel", ORANGE)
    product_card(c, ASSETS / "products" / "turbo-power-sae40.png", 700, 302, 102, 154, "SAE 40", "Monograde protection", GOLD)
    product_card(c, ASSETS / "products" / "pso-20w50.png", 585, 120, 217, 166, "PSO 20W-50", "Agricultural pump service  |  3.5 L", GREEN)
    c.setFillColor(PALE)
    c.roundRect(585, 48, 217, 56, 9, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(599, 84, "APPLICATION NOTE")
    draw_wrapped(c, "CI-4 / CH-4 / CF indicate diesel service categories; SL / SP indicate petrol service categories.",
                 599, 70, 190, size=7.1, leading=9, color=MUTED)
    c.showPage()

    # 04 - Motorcycle and service fluids
    page_base(c, 4, "Two-Wheeler and Service")
    section_title(c, "04", "Mobility & maintenance", "Two-wheelers and workshop essentials.",
                  "Scooter, motorcycle and 2-stroke coverage, plus brake, fork and cooling-system service fluids.")
    moto_rows = category(data, "Motorcycle Oil")["products"]
    service_rows = category(data, "Cooling and Service Fluids")["products"]
    draw_table(c, 32, 426, 490, moto_rows, row_height=31, accent=BLUE, font_size=7.2)
    draw_table(c, 32, 202, 490, service_rows, row_height=28, accent=GREEN, font_size=7.0)
    product_card(c, ASSETS / "products" / "scooter-4t-r-10w30.png", 548, 278, 120, 180, "4T-R 10W-30", "Scooter oil  |  800 mL", BLUE)
    product_card(c, ASSETS / "products" / "power-racer-2t.png", 682, 278, 120, 180, "POWER RACER 2T", "2-stroke engine oil", GREEN)
    product_card(c, ASSETS / "products" / "coolant-rad50t.png", 548, 74, 254, 186, "COOLING SYSTEM CARE", "Representative coolant pack", GREEN)
    c.showPage()

    # 05 - Gear oils
    page_base(c, 5, "Gear and Transmission")
    section_title(c, "05", "Drivetrain protection", "For gears, axles and transmissions.",
                  "Select the viscosity and GL category specified by the equipment manufacturer; these levels are not automatically interchangeable.")
    gear_rows = category(data, "Gear and Transmission Oil")["products"]
    draw_table(c, 32, 432, 540, gear_rows, row_height=31, accent=CYAN, font_size=6.9)
    product_card(c, ASSETS / "products" / "atf-tq.png", 598, 308, 95, 150, "ATF TQ", "Transmission fluid", RED)
    product_card(c, ASSETS / "products" / "utto-10w30.png", 706, 308, 95, 150, "UTTO", "Agri drivetrain", GREEN)
    product_card(c, ASSETS / "products" / "gear-ep140.png", 598, 98, 203, 194, "ULTRA GEAR GUARD", "Representative EP-140 / GL-3 pack", CYAN)
    c.setFillColor(INK)
    c.roundRect(598, 48, 203, 38, 8, stroke=0, fill=1)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 7)
    c.drawCentredString(699.5, 64, "ATF  /  UTTO  /  GL-1  /  GL-3  /  GL-4  /  GL-5")
    c.showPage()

    # 06 - Hydraulic and industrial
    page_base(c, 6, "Hydraulic and Industrial")
    section_title(c, "06", "Industrial reliability", "Fluids that keep systems moving.",
                  "Hydraulic, machining, electrical, compressor, spindle and turbine applications from workshop packs to 200 L drums.")
    hydraulic_rows = category(data, "Hydraulic Oil")["products"]
    industrial_rows = category(data, "Industrial Oil")["products"]
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(32, 430, "HYDRAULIC OIL")
    draw_table(c, 32, 416, 500, hydraulic_rows, row_height=30, accent=GOLD, font_size=7.2)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(32, 290, "INDUSTRIAL OIL")
    draw_table(c, 32, 276, 500, industrial_rows, row_height=31, accent=GOLD, font_size=7.0)
    product_card(c, ASSETS / "products" / "hydra-aw46.png", 555, 284, 108, 176, "HYDRA AW-46", "Representative 10 L pail", GOLD)
    drum_x, drum_y, drum_w, drum_h = 654, 74, 158, 386
    draw_image_contain(c, ASSETS / "generated" / "industrial-drum-200l.png", drum_x, drum_y, drum_w, drum_h)
    c.setFillColor(white)
    c.roundRect(676, 216, 115, 76, 6, stroke=0, fill=1)
    draw_image_contain(c, loaded_logo, 684, 250, 99, 35)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(733.5, 238, "INDUSTRIAL SERIES")
    c.setFont("Helvetica-Bold", 15)
    c.drawCentredString(733.5, 220, "200 L")
    c.setFillColor(GOLD)
    c.roundRect(568, 50, 230, 34, 17, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawCentredString(683, 63, "ISO VG 10 / 22 / 46 / 68  |  IEC 60296")
    c.showPage()

    # 07 - Grease and cooling
    page_base(c, 7, "Grease and Cooling")
    section_title(c, "07", "Protection beyond oil", "Grease, coolant and compact service packs.",
                  "Consistency, base type and service environment matter. Use the specified product for each lubrication or cooling point.")
    grease_rows = category(data, "Automotive Grease")["products"]
    cooling_rows = category(data, "Cooling and Service Fluids")["products"][:2]
    draw_table(c, 32, 426, 520, grease_rows, row_height=33, accent=RED, font_size=7.0)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(32, 222, "COOLING OIL")
    draw_table(c, 32, 208, 520, cooling_rows, row_height=32, accent=GREEN, font_size=7.2)
    product_card(c, ASSETS / "products" / "coolant-rad50t.png", 580, 266, 220, 192, "COOLANT RANGE", "RTU and concentrate formats", GREEN)
    c.setFillColor(PALE)
    c.roundRect(580, 92, 220, 156, 10, stroke=0, fill=1)
    c.setFillColor(RED)
    c.roundRect(594, 206, 66, 24, 12, stroke=0, fill=1)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(627, 214, "NLGI 2")
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(594, 186, "GREASE SELECTION")
    draw_wrapped(c,
                 "Multi-purpose, calcium, lithium and lithium-complex greases serve different temperature, water-resistance and load requirements.",
                 594, 169, 188, size=7.5, leading=10, color=MUTED)
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 7.2)
    c.drawString(594, 111, "PACK RANGE")
    draw_wrapped(c, "200 g to 180 kg  |  workshop to bulk service", 594, 97, 188, size=7.2, leading=9, color=INK)
    c.showPage()

    # 08 - Back cover
    page_base(c, 8, "Contact", dark=True)
    c.setFillColor(GOLD)
    c.rect(0, PAGE_H - 12, PAGE_W, 12, stroke=0, fill=1)
    c.setFillColor(white)
    c.roundRect(42, PAGE_H - 120, 250, 58, 10, stroke=0, fill=1)
    draw_image_contain(c, ASSETS / "brand" / "ag-logo.png", 50, PAGE_H - 114, 46, 46)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(104, PAGE_H - 87, "A.G. MANUFACTURING")
    c.setFont("Helvetica", 8)
    c.drawString(104, PAGE_H - 102, "AND TRADING PVT. LTD.")
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 34)
    c.drawString(42, 388, "BUILT FOR THE")
    c.setFillColor(GOLD)
    c.drawString(42, 347, "WORK THAT MOVES NEPAL.")
    c.setFillColor(Color(1, 1, 1, alpha=0.72))
    draw_wrapped(c,
                 "Automotive, agricultural and industrial lubricants manufactured in Manigram, Nepal.",
                 42, 312, 420, size=12, leading=16, color=Color(1, 1, 1, alpha=0.72))
    contact = [
        ("FACTORY & OFFICE", "Manigram, Tilottama-5, Rupandehi, Nepal"),
        ("PHONE", "071-438662  |  9705455555  |  9857028662  |  9867756460"),
        ("EMAIL", "info@agmanufacturing.com.np"),
        ("WEB", "www.agmanufacturing.com.np"),
    ]
    y = 242
    for label, value in contact:
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 7)
        c.drawString(42, y, label)
        c.setFillColor(white)
        c.setFont("Helvetica", 9.5)
        c.drawString(126, y, value)
        y -= 28
    c.setFillColor(white)
    c.roundRect(548, 128, 250, 320, 14, stroke=0, fill=1)
    draw_image_contain(c, loaded_logo, 580, 330, 186, 82)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(673, 308, "PRODUCT PORTFOLIO")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    coverage = ["ENGINE", "MOTORCYCLE", "GEAR", "HYDRAULIC", "INDUSTRIAL", "GREASE", "COOLING"]
    for idx, item in enumerate(coverage):
        col, row = idx % 2, idx // 2
        xx = 574 + col * 110
        yy = 270 - row * 42
        c.setFillColor(PALE)
        c.roundRect(xx, yy, 96, 27, 13, stroke=0, fill=1)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 7)
        c.drawCentredString(xx + 48, yy + 10, item)
    c.setFillColor(Color(1, 1, 1, alpha=0.54))
    draw_wrapped(c,
                 "This catalogue is a price-free product reference based on the supplied SKU list dated Bhadra 01, 2083. Product names, packs and specifications may change. Confirm the latest technical data sheet and equipment manufacturer recommendation before use.",
                 42, 76, 470, size=7.1, leading=9.5, color=Color(1, 1, 1, alpha=0.54))
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
