import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Your email account details
sender_email = "arvinsalehi99@gmail.com"
sender_password = "sxvz mdsb wwen fucq"

# Recipient's email address
recipient_email = "arvin.salehi1999@gmail.com"

file_path = "C:\\Users\\USER\\Desktop\\OrangeVillezip\\OrangeVille\\FeedBackTemplate.html"
# Read HTML content from a file
with open(file_path, "r") as file:
    html_content = file.read()

msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = recipient_email
msg['Subject'] = "Email with Embedded HTML Page"
msg.attach(MIMEText(html_content, 'html'))

# Connect to the SMTP server (Gmail example)
try:
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(sender_email, sender_password)

    # Send the email
    server.sendmail(sender_email, recipient_email, msg.as_string())
    print("Email with embedded HTML page from file sent successfully!")

except Exception as e:
    print(f"An error occurred: {str(e)}")

finally:
    # Close the SMTP server
    server.quit()
