with open('yt_page.html', encoding='utf-8') as f:
    text = f.read()

import re

with open('audio_info.txt', 'w', encoding='utf-8') as out:
    # Look for music / song / sound
    for m in re.finditer(r'("musicTitle"[^}]+|"songTitle"[^}]+|"soundTitle"[^}]+|"audioTrackTitle"[^}]+)', text):
        out.write(m.group(0) + '\n')
    
    # Also find video details
    v_idx = text.find('"videoDetails":')
    if v_idx != -1:
        out.write(text[v_idx:v_idx+1000] + '\n')

print("Written audio_info.txt successfully")
