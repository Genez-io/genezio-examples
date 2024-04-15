import os
import json

# Search recursively all `package.json` files in the current directory
def search_package_json_files():
    for root, dirs, files in os.walk('.'):
        for file in files:
            if "node_modules" in root:
                continue

            if file == 'package.json':
                yield os.path.join(root, file)

def main():
    for package_json_file in search_package_json_files():
        with open(package_json_file, 'r') as f:
            data = json.load(f)
            try:
                devDeps = data['devDependencies']
                deps = data['dependencies']
                if "vite" not in devDeps:
                    continue

                devDeps["vite"] = "^5.2.9"
                
                if "@genezio/vite-plugin-genezio" in devDeps:
                    devDeps["@genezio/vite-plugin-genezio"] = "^1.0.5"
                elif "@genezio/vite-plugin-genezio" in deps:
                    del deps["@genezio/vite-plugin-genezio"]
                    devDeps["@genezio/vite-plugin-genezio"] = "^1.0.5"
                else:
                    print("There was a problem with the package.json file: ", package_json_file)
            
                with open(package_json_file, 'w') as f:
                    json.dump(data, f, indent=2)
                    f.write('\n')
                print("Updated: ", package_json_file)
            except KeyError:
                continue

if __name__ == '__main__':
    main()