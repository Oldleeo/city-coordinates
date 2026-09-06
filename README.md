# 全球城市经纬度

一个纯静态、手机友好的全球城市公开住宿落点查询页面。

## 功能

- 89 个主要城市的公开住宿设施坐标
- 中文名、英文名、国家、设施名、地址和邮编即时搜索
- 按地区筛选
- 一键复制坐标或完整落点信息
- 支持切换“纬度, 经度”与“经度, 纬度”格式
- 内置 iPhone 模拟定位日常使用流程
- 直接跳转到 iOS Location Spoofer 控制面板

## 数据与隐私

地址、邮编和坐标来自 OpenStreetMap/Nominatim 的公开住宿设施数据。页面不收集或发布私人住宅和真实房间号；`DEMO-xxxx` 仅是虚构格式示例，GPS 坐标也无法区分同一栋建筑内的房间。

需要刷新公开落点数据时可运行：

```bash
node scripts/fetch-public-stays.mjs
```

## GitHub Pages

仓库发布后，在 **Settings → Pages** 中选择 **Deploy from a branch**，分支选择 `main`，目录选择 `/ (root)`。
