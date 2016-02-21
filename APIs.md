一步方案APIs
====================

前缀

http://1-step.cn/api/v1

http://api.1-step.cn

数据结构
===============================

模块(module)
-------------------------------

智能楼宇系统树形结构中任一节点, 从整个系统(如安防系统)到可具体对应到一类产品的节点(如摄像头)都是模块

    {
        "id":"",
        "name":"",
        "description":"",
        "poster":"", // 模块图片url, 无图片时为null
        "parent":module, // 上级模块(无parent字段)

        // 以下字段仅在solution.modules的module中存在
        "profiles": // 模块的参数特性要求
        [{
            "parameter":parameter,
            "value":"" | [""] | {"from":0.00,"to":10.00}, // 参数值, 或参数值可选值, 或参数值可选范围(仅参数值为数字时)
        }],
        "products":[product], // 备选的产品列表, 仅展示
        "priceRange":[0.00, 10000.00], // 造价范围, 仅展示
        "children":[module], // solution中, 模块的子模块
        "amount":1
    }

参数(parameter)
-------------------------------

模块或产品的一系列参数类型和可选值

    {
        "id":"",
        "name":"",
        "module":module,
        "type":"", // select(选项), text(文字输入)
        "options":[""]
    }

产品(product)
-------------------------------

模块对应的具体方案中的产品, 具有具体的参数值

    {
        "id":"",
        "module":module,
        "name":"",
        "description":"",
        "brand":"",
        "price":0.00
        "profiles": // 产品的参数特性
        [{
            "parameter":parameter,
            "value":""
        }]
    }

方案(solution)
-------------------------------

    {
        "id":"",
        "name":"",
        "description":"",
        "priceRange":[0.00, 10000.00], // 方案总估价(最小值, 最大值), 仅展示
        "modules":[module]
    }

文书模板(template)
-------------------------------

	{
		"id":"",
		"title":"",
		"description":"",
		"sections": // 带参数的模板
		[{
			"text":"{这是一段测试{{ param1 }}的{{ param2 }}",
			params:{
				"param1":{"type":"select", "options":["功能", "样式", "性能"]}
				"param2":{"type":"text", "examples":[{"title":"示例1", "text":"示例内容"}]}
			}
		}]
	}

文书(paper)
-------------------------------

	{
		"id":"",
		"template":"",
		"solution":"",
		"title":"",
		"sections": // 带参数
		[
			"text":"{这是一段测试{{ param1 }}的{{ param2 }}",
			params:{
				"param1":"功能"
				"param2":"示例内容"
			}
		]
	}

用户(user)
-------------------------------

    {
        "id":"",
        "name":""
    }


接口
===============================

获得模块列表
-------------------------------

    GET /module
    query:{
        "keyword":"" // 搜索名称
        "parent_id":"" // 上级模块ID, 留空时搜索顶级模块
    }
    response:[module]

获得模块详情
-------------------------------

    GET /module/:id
    response:module

获得参数列表
-------------------------------

    GET /parameter
    query:{
        "module_id":""
    }

获得参数详情
-------------------------------

    GET /parameter/:id
    response:parameter

获得产品列表
-------------------------------

    GET /product
    query:{
        "module_id":""
    }
    response:[product]

获得产品详情
-------------------------------

    GET /product/:id
    response:product

获得方案列表
-------------------------------

    GET /solution
    query:{
        "keyword":""
    }
    response:[solution]

获得方案详情
-------------------------------

    GET /solution/:id
    response:solution

获得模板列表
-------------------------------

    GET /template
    query:{
        "keyword":""
    }
    response:[template]

获得模板详情
-------------------------------

    GET /template/:id
    response:template

获得文书列表
-------------------------------

    GET /paper
    query:{
        "keyword":""
    }
    response:[paper]

获得文书详情
-------------------------------

    GET /paper/:id
    response:paper

用户鉴权
-------------------------------

    POST /auth
    body:{
    	"username":"",
    	"password":""
    }
    response:user // 另含token字段, 包含在以后请求的请求头Authorization中, 用以验证身份

用户注册
-------------------------------

    POST /user
    body:user
    response:user // 另含token字段, 包含在以后请求的请求头Authorization中, 用以验证身份


