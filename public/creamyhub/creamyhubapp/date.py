from datetime import datetime
import pytz
def sendtime():
    local_timezone = pytz.timezone('Asia/kolkata')  # Replace 'Asia/Kolkata' with your desired timezone
    current_datetime = datetime.now(local_timezone)
    
    # Format the local date and time as a string
    date_time_str = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    
    # Include date and time in the note
    note = f'Creamyhub - {date_time_str}'
    # print(note)
    return(note)
