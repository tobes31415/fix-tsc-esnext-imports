The typescript compiler does not generate valid modules when using "module"= "ESNext".  Specifically it's missing the file extension for the generated files for any local imports and exports.  Some bundlers and tools see this and correctly give error messages.  Whether or not the tools should compensate for invalid files is a topic for elsewhere, here lets just fix the files and move on. 

This cli tool goes over the generated output and adds in the missing .js references.  If the specific file you're trying to import doesn't exist then instead we assume you're pulling in a directory and append /index.js instead.

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
