import pygame
from pygame.locals import QUIT
import requests
from io import BytesIO
from moviepy.editor import VideoFileClip

# Video URL
video_url = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

# Video dosyasını indir
response = requests.get(video_url)
clip = VideoFileClip(BytesIO(response.content))

# Pygame penceresini ayarla
pygame.init()
width, height = clip.size
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("Video Player")

# Clock tanımla
clock = pygame.time.Clock()

# Video oynatma döngüsü
running = True
while running:
    for event in pygame.event.get():
        if event.type == QUIT:
            running = False

    # Video çerçevesini al
    frame = clip.get_frame(clip.fl_time(clip.get_time()))

    # Pygame penceresine çerçeveyi çiz
    pygame.surfarray.blit_array(screen, frame.swapaxes(0, 1))
    pygame.display.flip()

    # Oyun döngüsünü ayarla
    clock.tick_busy_loop(30)

# Pygame kapat
pygame.quit()
