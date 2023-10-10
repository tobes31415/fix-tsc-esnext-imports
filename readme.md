# fix-tsc-esnext-imports
The typescript compiler does not generate valid modules when using "module"= "ESNext".  Specifically it's missing the file extension for the generated files for any local imports and exports.  Module loaders like the browser and deno expect those imports to actually correspond to files.  Whether or not they should compensate for missing extensions is a topic for elsewhere, The goal here is just to fix the files. 

This cli tool goes over the generated output and adds in the missing .js references for any local imports and exports.  If the specific file you're trying to import doesn't exist then instead we assume you're pulling in a directory and append /index.js instead.  A local import needing to be fixed is defined as starting with dot slash "./" or dot dot slash "../" and not containing a second dot in the remainder of the import.

This tool does not address named imports, only local ones.  Though might add that at a later time via flags if it's needed.
# Useage
## From package.json
```json
"scripts": 
{
    "fix-imports": "fix-tsc-esnext-imports path/to/output/folder"
}
```

## From command line
```
npx fix-tsc-esnext-imports path/to/output/folder
```
