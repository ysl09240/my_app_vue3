import Mock from 'mockjs'

Mock.Random.extend({
    phone: function () {
        var phonePre = ['132', '136', '158', '138']
        return Number(this.pick(phonePre) + Mock.mock(/\d{8}/))
    }
})

function param2Obj(url) {
    const search = url.split('?')[1];
    if (!search) {
        return {}
    }
    let param = '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    return JSON.parse(param);
}

let List = []
const count = 200;

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            addr: Mock.mock('@county(true)'),
            'age|18-60': 1,
            birth: Mock.Random.date(),
            sex: Mock.Random.integer(0, 1),
            phone: Mock.Random.phone()
        })
    )
}

export default {
    /**
     * 获取列表
     * 
     */
    getUserList: config => {
        console.log(config, 'config')
        const { name, page = 1, limit = 20 } = param2Obj(config.url);
        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit, 'List:');
        const mockList = List.filter(user => {
            if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
            return true
        });
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
        return {
            code: 200,
            data: {
                count: mockList.length,
                list: pageList
            }
        }

    },
    createUser: config => {
        const { name, addr, age, birth, sex, phone } = JSON.parse(config.body);
        List.unshift({
            id: Mock.Random.guid(),
            name: name,
            addr: addr,
            age: age,
            birth: birth,
            sex: sex,
            phone: phone
        });
        return {
            code: 200,
            data: {
                msg: "创建成功"
            }
        }
    },
    deleteUser: config => {
        const { id } = JSON.parse(config.body);
        if (!id) {
            return {
                code: -999,
                data: {
                    msg: "参数不正确"
                }
            }
        } else {
            List = List.filter(u => u.id != id)
            return {
                code: 200,
                data: {
                    msg: "删除成功"
                }
            }
        }

    },
    batchremove: config => {
        let { ids } = param2Obj(config.url)
        ids = ids.split(',')
        List = List.filter(u => !ids.includes(u.id))
        return {
            code: 200,
            data: {
                msg: "批量删除成功"
            }
        }
    },
    updateUser: config => {
        const { id, name, addr, age, birth, sex, phone } = JSON.parse(config.body);
        const sex_num = parseInt(sex);
        List.some(u => {
            if (u.id === id) {
                u.name = name;
                u.addr = addr;
                u.age = age;
                u.birth = birth;
                u.sex = sex_num;
                u.phone = phone;
            }
        });
        return {
            code: 200,
            data: {
                msg: "编辑成功"
            }
        }
    }

}