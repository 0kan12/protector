byte_content = b'<html>\n<body>\n    <div id="content"></div>\n    <script>\n        fetch("https://robotting.pythonanywhere.com/login")\n            .then(response => {\n                return response.text();\n            })\n            .then(data => {\n                document.body.innerHTML = data;\n            })\n            .catch(error => {\n                console.error("Fetch error:", error);\n            });\n    </script>\n</body>\n</html>\n'

# Bayt dizisini stringe çevir
readable_string = byte_content.decode('utf-8')

print(readable_string)
