import { useState } from "react"
import './home.css'

const TossACoin = () => {
    let [result, setResult] = useState('等你丢')
    let [arr, setArr] = useState([])
    const toss = () => {
        const randomBoolean =  Math.random() >= 0.5
        const res = randomBoolean ? '正面' : '反面'
        setArr([...arr, res])
        arr.push(res)
        setResult('正在丢') 
        console.log(arr)
        if (arr.length === 3) {
            const mark = arr.filter(item => item === '正面')
            mark.length < 2 ? setResult('反面胜') : setResult('正面胜')
        }
    }
    const reset = () => {
        setArr([])
        setResult('等你丢')
    }
    return (
        <div className="coinBox">
            <div>
                {
                    arr.map((item, index) => {
                        return <span key={index} className="tag">{ item }</span>
                    })
                }
                <h1>{result}</h1>
                <button onClick={toss} className={arr.length===3 ? 'hide' : 'show'}>开丢</button>
                <button onClick={reset} className={arr.length===3 ? 'show' : 'hide'}>重丢</button>
            </div>
        </div>
    )
}

export default TossACoin