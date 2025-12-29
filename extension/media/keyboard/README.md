# Keyboard Icons

The SVG icons here were exported from Figma.
https://www.figma.com/design/ZduSLFbgvYmYtPFBPbKCFR/Next-Edit-Icons?node-id=0-1&node-type=canvas&t=KfI62rqNZiMh58BS-0

Note that the semicolon icon there is adjusted slightly upwards.

To put these into a font I had to convert them from using strokes to paths. I used Inkscape to do this.
The script I used was:
```bash
mkdir -p _output

for i in *.svg
do
   /Applications/Inkscape.app/Contents/MacOS/inkscape --actions="select-all;selection-ungroup;select-all;selection-ungroup;select-all;object-stroke-to-path;" --export-filename=- $i > _output/$i
   echo "done with "$i
done
```

Then I ran the output SVGs through [Fantasticon](https://github.com/tancredi/fantasticon) with the default settings to get the WOFF font.
The output of Fantasticon also included some html, css, and ts that had the mappings from font to icon. I asked Augment to turn the CSS
into JSON matching the format of VS Code's package.json for icons, and put those mappings there. I put the font at the root of the extension next to our other icon font.
