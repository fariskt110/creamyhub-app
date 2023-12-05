import qrcode
def Generateqr(sum):
    upi_id = 'fariskt1110-1@oksbi'
    name = 'faris'
    note = 'Company'
    amount = sum

    # UPI URL format
    upi_url = f"upi://pay?pa={upi_id}&pn={name}&tn={note}&am={amount}&cu=INR"

    # Generate QR code
    qr = qrcode.make(upi_url)

    # Save the QR code as image
    qr.save(r"static\images\QR\upi_qr.png")