## Optimizing Images

- **jpg** format
- 2x size than the one I use for showing them in <Image /> tag
- low quality for not important images - 75, higher - 90 for important ones

Example command:
```magick mogrify -path projects-optimized -format jpg -resize "970x" -quality 75 projects/*.jpg```