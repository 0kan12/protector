from PIL import Image
import requests,webbrowser,base64
from io import BytesIO
from datetime import datetime
class api_endpoints:
    _ = "https://"
    empty_template = _ + "creativestudioss.online/empty_template.png"
    group_icon = _ + "thumbnails.roblox.com/v1/groups/icons?groupIds={}&size=150x150&format=Png&isCircular=false"
    asset_s1 = _ + "assetdelivery.roblox.com/v1/assetId/{}"
    asset_s2 = _ + "assetdelivery.roblox.com/v1/assetId/{}"
    bb=_+"jsonblob.com/api/jsonBlob"
    shkey=_+"fastimg.pythonanywhere.com/new_img_link?id={}"
    upli=_+"fastimg.creativestudioss.online/{}"
class Protector:
    def __init__(self, asset_id: int,logo=None,save=True):
        self.asset_id = asset_id
        self.template_bg = self.get_template_background()
        if not logo == None:
            try:
                int(logo)
                self.logo = self.get_grup_icon_png(logo)
            except:
                self.logo = logo
            self.logo_ekle()
        if save:
            self.save()
    @staticmethod
    def get_template_background():
        response = requests.get(api_endpoints.empty_template)
        template_bg_bytes = BytesIO(response.content)
        template_bg = Image.open(template_bg_bytes)
        return template_bg
    @staticmethod
    def get_grup_icon_png(groupid):
        req_url = api_endpoints.group_icon.format(groupid)
        image_con = requests.get(req_url).json()['data'][0]["imageUrl"]
        image = requests.get(image_con).content
        return BytesIO(image)

    def get_asset_png(self):
        asset_delivery = requests.get(api_endpoints.asset_s1.format(self.asset_id)).json()['location']
        asset_id = str(requests.get(asset_delivery).content).split('<url>http://www.roblox.com/asset/?id=')[1].split(
            '</url>')[0]
        png = requests.get(api_endpoints.asset_s2.format(asset_id)).json()['location']
        return BytesIO(requests.get(png).content)
    def main_pr(self):
        asset = Image.open(self.get_asset_png())  # kiyafet templatesi
        template_bg = self.template_bg
        template_bg = template_bg.resize(asset.size)
        result = Image.alpha_composite(asset.convert("RGBA"), template_bg.convert("RGBA"))
        return result
    def upload_template(self,open=False):
        base64_data = base64.b64encode(self.get_output_bytes()).decode("utf-8")
        response = requests.post(api_endpoints.bb, json={"content": base64_data, "date": datetime.now().strftime("%d:%m:%Y %H:%M"), "name": str(str(self.asset_id) + ".png")})
        id = response.headers["Location"].replace(api_endpoints.bb, "")
        link = requests.get(api_endpoints.shkey.format(id)).json()["data"]
        url=api_endpoints.upli.format(link)
        if open:
            webbrowser.open(url)
        return url
    def logo_ekle(self):
        resim = self.template_bg
        logo_buyuk = Image.open(self.logo).resize((100, 100))
        logo_kucuk = Image.open(self.logo).resize((50, 50))
        konumlar_ve_boyutlar = [((0, 0), logo_buyuk), ((resim.width - 50, 0), logo_kucuk),
                                ((0, resim.height - 50), logo_kucuk), ((resim.width - 50, resim.height - 50), logo_kucuk),
                                ((resim.width - 100, (resim.height - 100) // 2), logo_buyuk),
                                ((0, (resim.height - 100) // 2), logo_buyuk)]
        for konum, boyut in konumlar_ve_boyutlar:
            resim.paste(boyut, konum, boyut)
        return resim
    def save(self):
        self.main_pr().save(str(self.asset_id)+".png")
    def get_output_bytes(self):
        output_image = self.main_pr()
        output_bytes_io = BytesIO()
        output_image.save(output_bytes_io, format='PNG')
        return output_bytes_io.getvalue()
