# ffmpeg

## 转码高质量gif图

```shell
ffmpeg -i input.mp4 -vf
```

```shell
ffmpeg -i input.gif -vf "split[s0][s1];[s0]palettegen=stats_mode=single[p];[s1][p]paletteuse=new=1" out.gif
```

## 修改视频帧率

```shell
ffmpeg -i input.mp4 -r 30 out.mp4
```

## 修改视频尺寸

```shell
ffmpeg -i in.mp4 -filter:v "crop=out_w:out_h:x:y" out.mp4
```

```shell
-vf "crop=1080:1080:420:0"
```

## 视频文件去掉视频

```shell
ffmpeg -i in.mp4 -vn out.mp4
```

