# python

## 通用

### 删除字符串前后多余的空格

```
 " ".strip()
```

### 限定几位小数

```
round(n,2)
```

### argparse

```python
parser = argparse.ArgumentParser(description="doc")
```

### glob排序

```
paths = glob.glob(os.path.join("",""))
paths = sorted(paths, key=os.path.getmtime)
```

### 子目录脚本访问

```
main脚本访问，默认当前文件所在路径为主路径，pythonpath添加${workspaceFolder}
```

### re表达式

```
re.match(r'正则表达式', test) 匹配返回结果，否则返回None
```

```
[0-9a-zA-Z]{0,8}
```

```
(a|b)
```

### 写excel

```python
import xlwt
workbook = xlwt.Workbook()
worksheet = workbook.add_sheet('test')
worksheet.write(0, 0, "ada")
workbook.save(save_path)
```

### 边框padding

```python
pad = 16
image_crop = cv.copyMakeBorder(image_crop, pad, pad, pad, pad, cv.BORDER_CONSTANT, value=0)
# top, bottom, left, right
```

### 画热力图

```python
heatmap = cv.applyColorMap(mask, cv.COLORMAP_HOT)
# https://docs.opencv.org/4.5.2/d3/d50/group__imgproc__colormap.html
```

### 保存变量

```python
import pickle

with open(save_path, 'wb') as f:
    pickle.dump(value, f)

with open(save_path, 'rb') as f:
		value = pickle.load(f)
```

### 阈值

```python
_, seg_mask_binary = cv.threshold(seg_mask, 127, 255, cv.THRESH_BINARY)
#https://blog.csdn.net/u012566751/article/details/77046445
```

### 获取轮廓

```python
contours, _ = cv.findContours(seg_mask, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
#cv.CV_RETR_EXTERNAL 检测最外侧
#https://blog.csdn.net/dcrmg/article/details/51987348
```

### 画轮廓

```python
img=cv.drawCountours(img,contours,-1,color,thinkness) 
#https://blog.csdn.net/u013066730/article/details/103528788
```

### 打印进度百分比

```
import tqdm
tqdm.tqdm()

```

### itertools

```

```

## numpy

### 重新创建维度合并

```
np.stack
```

### 复制

```
np.tile(a,2)
```

## pytorch

### 扩充一个维度

```python
input_tensor = torch.unsqueeze(input_tensor, axis=0)test
```



