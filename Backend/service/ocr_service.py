import pytesseract
from PIL import Image
import os

# THIS LINE SOLVES THE "TesseractNotFoundError"
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_text_from_bill(image_path: str):
    if not os.path.exists(image_path):
        return "Error: Image file not found."
    
    try:
        # Open the image using Pillow
        img = Image.open(image_path)
        
        # Perform OCR
        extracted_text = pytesseract.image_to_string(img)
        return extracted_text
    except Exception as e:
        return f"OCR Error: {str(e)}"