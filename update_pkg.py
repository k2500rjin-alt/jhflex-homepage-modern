import json
import os

pkg_path = r"d:\Works\Project\01_진행중\JH_Flex Site\package.json"
with open(pkg_path, "r", encoding="utf-8") as f:
    data = json.load(f)

data["scripts"]["predeploy"] = "npm run build"
data["scripts"]["deploy"] = "gh-pages -d dist/public"

with open(pkg_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)
print("Updated package.json")
