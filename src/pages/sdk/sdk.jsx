import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { Row, Col, Input, Button } from 'antd'
import qs from 'qs'
import flowSdk from 'weihu-flow-sdk'
import './sdk.css'

const FlowSdk = () => {
    const [name, setName] = useState('')
    const [ivrList, setIvrList] = useState([])
    const isInitialMount = useRef(true);
    const [sdkDialog, setSdkDialog] = useState(false)
    const onLogin = () => {
        const params = qs.stringify({
            username: 'weihu',
            password: 'MTIzNDU2'
        })
        axios.post('obc/api/login', params).then(res => {
            const data = res.data.data
            localStorage.token = data.auth
            localStorage.companyId = data.companyId
            localStorage.userInfo = JSON.stringify(data.userInfo)
            getData()
        })
    }
    const getData = () => {
        axios.get('obc/api/ivr/page', {
            params: {
                token: localStorage.token,
                pageNo: 1,
                pageSize: 9,
                name: name
            }
        }).then(res => {
            setIvrList(res.data.data.records)
        })
    }
    const createTemplate = (data, state) => {
        setSdkDialog(true)
        flowSdk.init({
            el: 'flowsdk',
            login: 'default',
            id: data?.id ?? '',
            state: state,
            onClose() {
                setSdkDialog(false)
            },
            onSave(id) {
                setSdkDialog(false)
                console.log(id)
            }
        })
    }
    const nameChange = val => {
        setName(val.target.value)
    }
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
            onLogin()
        }
    })
    return (
        <div>
            <Row gutter={20}>
                <Col span={4}>
                    <Input placeholder="模版名称查询" value={name} onChange={nameChange} />
                </Col>
                <Col span={4}>
                    <Button type="primary" onClick={() => getData()}>查询</Button>
                </Col>
                <Col span={16} align="right">
                    <Button type="primary" onClick={() => createTemplate(null, '')}>新建模版</Button>
                </Col>
            </Row>
            <Row gutter={20}>
                {
                    ivrList.map(item => {
                        return <Col span={8} key={item.id}>
                            <div className="voiceCard autoH">
                                <div className="cardHead">
                                    <div className="cardTop">
                                        <div className="card-title">
                                            { item.name }
                                        </div>
                                    </div>
                                    <p>模 版 SN: { item.id }</p>
                                    <p>创建时间: { item.ctime ? item.ctime : '' }</p>
                                    <p>更新时间: { item.utime ? item.utime : '' }</p>
                                </div>
                                <div className="cardFooter">
                                    <div className="toolBox">
                                        <Button type="primary" ghost onClick={() => createTemplate(item, 'edit')}>编辑模版</Button>
                                        <Button type="primary" ghost onClick={() => createTemplate(item, 'detail')}>查看模版</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    })
                }
            </Row>
            <div id="sdkBox" className={sdkDialog ? 'show' : 'hide'}>
                <div id="flowsdk"></div>
            </div>
        </div>
    )
}

export default FlowSdk