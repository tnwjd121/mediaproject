import React, { useState } from 'react'
import '../css/addiction.css'

export default function Addiction() {

  const[answers, setAnswers] = useState({
    Q1: "",
    Q2: "",
    Q3: "",
    Q4: "",
    Q5: "",
    Q6: "",
    Q7: "",
    Q8: "",
    Q9: "",
    Q10: "",
  })
  const testResult = document.querySelector("#test-result")


  const handleClick = () => {
    const unAnswerd = Object.keys(answers).filter(question => answers[question]==="")
    if (unAnswerd.length > 0) {
      alert(`선택 안 된 문제가 있습니다 : ${unAnswerd.join(", ")}`)
    }else{
      const result = Object.keys(answers).map(question => answers[question] === "YES" ? 1 : 0)
      const count = result.reduce((acc, val) => acc + val, 0)
      if(count>7){
        testResult.textContent ="검사 결과: 미디어 중독"
      } else if(count>4){
        testResult.textContent = "검사 결과: 미디어 중독 의심"
      } else if(count>2){
        testResult.textContent = "검사 결과: 미디어 중독 위험"
      } else{
        testResult.textContent = "검사 결과: 정상"
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  

  return (
    <div id='body'>
      <div id='addiction-body'>
      <h1 id='addiction-title'>미디어 중독 테스트</h1>
        <div id='question-body'>
          <table id='addiction-table'>
            <thead>
              <tr>
                <th>항목</th>
                <th>YES</th>
                <th>NO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='left-sort'> Q1. 스마트미디어 사용시간을 줄이려 할 때마다 실패한다.</td>
                <td><input type='radio' name='Q1' value="YES" onChange={handleChange}/></td>
                <td><input type='radio' name='Q1' value="NO" onChange={handleChange}/></td>
              </tr>
              <tr>
                <td className='left-sort'> Q2. 스마트미디어 사용시간을 조절 하는 것이 어렵다</td>
                <td><input type='radio' name='Q2' value="YES" onChange={handleChange}/></td>
                <td><input type='radio' name='Q2' value="NO" onChange={handleChange}/></td>
              </tr>
              <tr>
                <td className='left-sort'> Q3. 적절한 스마트미디어 사용시간을 지키는 것이 어렵다.</td>
                <td><input type='radio' name='Q3' value="YES" onChange={handleChange}/></td>
                <td><input type='radio' name='Q3' value="NO" onChange={handleChange}/></td>
              </tr>
              <tr>
                <td className='left-sort'>  Q4. 스마트미디어가 옆에 있으면 다른 일에 집중하기 어렵다.</td>
                <td><input type='radio' name='Q4' value="YES" onChange={handleChange}/></td>
                <td><input type='radio' name='Q4' value="NO" onChange={handleChange}/></td>
              </tr>
              <tr>
                <td className='left-sort'> Q5. 스마트미디어 생각이 머리에서 떠나지 않는다.</td>
                <td><input type='radio' name='Q5' value="YES" onChange={handleChange}/></td>
                <td><input type='radio' name='Q5' value="NO" onChange={handleChange}/></td>
              </tr>
              <tr>
                <td className='left-sort'> Q6. 스마트미디어를 이용하고 싶은 충동을 강하게 느낀다.</td>
                <td><input type='radio' name='Q6' value="YES" onChange={handleChange}/></td>
                <td><input type='radio' name='Q6' value="NO" onChange={handleChange}/></td>
              </tr>
              <tr>
                <td className='left-sort'> Q7. 스마트미디어 사용 때문에 건강에 문제가 생긴 적이 있다.</td>
                <td><input type='radio' name='Q7' value="YES" onChange={handleChange}/></td>
                <td><input type='radio' name='Q7' value="NO" onChange={handleChange}/></td>
              </tr>
              <tr>
                <td className='left-sort'> Q8. 스마트미디어 사용 때문에 가족과 심하게 다툰 적이 있다.</td>
                <td><input type='radio' name='Q8' value="YES" onChange={handleChange}/></td>
                <td><input type='radio' name='Q8' value="NO" onChange={handleChange}/></td>
              </tr>
              <tr>
                <td className='left-sort'> Q9. 스마트미디어 사용 때문에 친구 혹은 동료, 사회적 관계에서 심한 갈등을 경험한 적이 있다.</td>
                <td><input type='radio' name='Q9' value="YES" onChange={handleChange}/></td>
                <td><input type='radio' name='Q9' value="NO" onChange={handleChange}/></td>
              </tr>
              <tr>
                <td className='left-sort'> Q10. 스마트미디어 때문에 업무(학업 혹은 직업 등) 수행에 어려움이 있다.</td>
                <td><input type='radio' name='Q10' value="YES" onChange={handleChange}/></td>
                <td><input type='radio' name='Q10' value="NO" onChange={handleChange}/></td>
              </tr>
            </tbody>
          </table>
            <button id='addiction-button' onClick={handleClick}>검사 결과</button>
            <p id='test-result'></p>
          </div> 
      </div>
    </div>
  )
}
