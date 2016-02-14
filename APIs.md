一步方案APIs
====================

前缀

http://1-step.cn/api/v1

http://api.1-step.cn

数据结构
===============================

模块(module)
-------------------------------

    {
        "id":"",
        "name":"",
        "description":"",
        "parent":module,

        // 以下字段仅在solution.modules的module中存在
        "profiles": // 模块的参数要求
        [
            "parameter":parameter,
            "value":"" | [""] | {"from":0.00,"to":10.00}, // 参数值, 或参数值可选值, 或参数值可选范围(仅参数值为数字时)
        ],
        "products":[product], // 备选的产品列表
        "priceRange":[0.00, 10000.00], // 造价范围
        "children":[module] // solution中, 模块的子模块
    }

参数(parameter)
-------------------------------

    {
        "id":"",
        "name":"",
        "module":module,
        "type":"", // select(选项), text(文字输入)
        "options":[""]
    }

产品(product)
-------------------------------

    {
        "id":"",
        "module":module,
        "name":"",
        "description":"",
        "brand":"",
        "price":0.00
    }

方案(solution)
-------------------------------

    {
        "id":"",
        "name":"",
        "description":"",
        "priceRange":[0.00, 10000.00], // 方案总估价(最小值, 最大值)
        "modules":[module]
    }

用户(user)
-------------------------------

    {
        "id":"",
        "name":""
    }


接口
===============================

获得方案列表
-------------------------------

    GET /solution
    query:{
        "keyword":""
    }

获得模块列表
-------------------------------

    GET /module
    query:{
        "keyword":"" // 搜索名称
        "parent_id":"" // 上级模块ID, 留空时搜索顶级模块
    }
    response:[module]

获得参数列表
-------------------------------

    GET /parameter
    query:{
        "module_id":""
    }

获得产品列表
-------------------------------

    GET /product
    query:{
        "module_id":""
    }
