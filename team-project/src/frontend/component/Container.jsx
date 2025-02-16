import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import Box from './Box';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Progress from './Progress';
// import Progress from './Progress';
import './Progress.css';

const StyledContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    height: 100vh;
    padding: 0 0 50px 0;
    // background: radial-gradient(
    //     200% 100% at bottom center,
    //     #f7f7b6,
    //     #e96f92,
    //     #75517d,
    //     #1b2947
    // );
    // background: radial-gradient(
    //     220% 105% at top center,
    //     #1b2947 10%,
    //     #75517d 40%,
    //     #e96f92 65%,
    //     #f7f7b6
    // );
    // background-attachment: fixed;
    // overflow: hidden;
    // background: linear-gradient(#8a2be2, #ba55d3, #dda0dd);
    // background-color: white;
    font-family: 'UhBeemysen';

    line-height: 2;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: auto;
    margin: 0 auto;
    max-width: 1200px;
    white-space: pre-line;
`;

const QBox = styled.div`
    width: 500px;
    @media screen and (max-width: 768px) {
        width: 400px;
    }
    height: 300px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: 700;
    word-break: keep-all;
    margin: 30px auto 50px auto; // 수정한 부분:가운데로 가게
    padding: 30px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid #ec96b5;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
const fadeOutAnimation = keyframes`
from {
    opacity:1;
}
to {
    opacity:0;
}
`;
const fadeInAnimation = keyframes`
from {
    opacity : 0;
}
to {
    opacity : 1;
}
`;
const Grid = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    @media screen and (max-width: 768px) {
        width: 400px;
    }
    margin: 0 auto;

    &.click {
        animation: ${fadeOutAnimation} 0.2s ease-out;
    }
    &.next {
        animation: ${fadeInAnimation} 0.2s ease-in;
    }
`;
const ResultButton = styled.div`
    all: unset;

    text-align: center;
    background-color: white;
    color: #4c200b;
    border-radius: 10px;
    width: 150px;
    margin: 0 auto;
    font-size: 28px;
    font-weight: 900;
    &:hover {
        background-color: #e6e6fa;
    }
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border: 1px solid #ec96b5;
`;
const ResultButtonWrapper = styled.div`

    width: 500px;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 768px) {
        width: 400px;
    }
}}
`;
function Container(props) {
    const questionBox = [
        '오늘은 오랜만에 쉬는 날! \n머리가 조금 복잡해져서 밖으로 나가려고 하는데, \n평일에 어떤 고민을 해왔을까?',
        '오늘은 힐링을 위해 소품샵에 가려고 외출을 하였다. \n소품샵을 가는 길에 언젠가 한번 가보려고 했던 가게가 보인다. 이때, 당신에게 드는 생각은?',
        '소품샵에 들어가자마자 마음에 쏙 드는 물건을 발견한 당신! 당신은 어떤 것을 더 먼저 보는가?',
        '사장님이 액자를 걸고 있는 모습을 발견한다. \n 이때 떠오른 생각은?',
        '귀여운 것들을 구경하고 있다보니까 핫플인지\n 사람들이 꽤나 많아졌다. 북적거리는 소품샵 내부에서 어떤 사람이 내 발을 실수로 밟았다. 당신의 반응은?',
        '소품샵을 구경하던 중 우연히 친구를 만났다. \n친구가 이 물건을 사는 것이 어떠냐고 물어볼 때 당신의 반응은?',
        '사람이 더 많아진 것 같다…! \n 주위에서 웅성대는 소리가 들려 고개를 돌려보았더니 \n직원이 진상 손님이랑 말다툼을 벌이고 있다. \n이때, 당신이 드는 생각은?',
        '진상손님이 나간 이후 조금 잠잠해진 소품샵에서 \n소품샵을 본격적으로 쇼핑을 하려고 하는데, \n어떻게 구경할 것인가?',
        '소품샵에서 소품을 고르던 당신! \n누군가와 손이 겹쳐지는데....',
        '소품샵에서 갑자기 깜짝 이벤트를 진행한다!\n 이때 당신은 어떻게 할 것인가?',
        '계산대로 향한 당신의 장바구니에는 뭐가 들어있나?',
        '가게를 다 둘러보고 이제 가려고 한다.\n오늘의 쇼핑이 꽤나 마음에 들었던 당신! \n당신의 행동은?',
    ];
    const answerBoxA = [
        { mbti: 'N', answer: '미래에 대한 두루뭉실한 고민' },
        {
            mbti: 'J',
            answer: '오늘은 소품샵을 들르기로 했으니까 소품샵으로 가야지! ',
        },
        { mbti: 'T', answer: '가격' },
        {
            mbti: 'S',
            answer: '사장님 열심히 일하시네,,! ',
        },
        { mbti: 'E', answer: '아야! (내가 밟혔다는 사실을 어떻게든 티낸다)' },
        { mbti: 'T', answer: '일단 내려놔..' },
        { mbti: 'F', answer: '아.. 저 직원 진짜 힘들겠다; ' },
        { mbti: 'P', answer: '발길이 닿는대로 움직인다.' },
        { mbti: 'N', answer: '뭐지.. 저 사람..?(결혼까지 생각한다..)' },
        { mbti: 'I', answer: '설렁 설렁 참여하거나 구경한다' },
        { mbti: 'J', answer: '사려고 했던 물건들' },
        { mbti: 'E', answer: '여긴 나만 알기엔 아까워! 동네방네 소문낸다.' },
    ];
    const answerBoxB = [
        { mbti: 'S', answer: '오늘 당장 해야하는 것에 대한 고민' },
        { mbti: 'P', answer: '이왕 나온 김에 저기도 들렀다가 가자! ' },
        { mbti: 'F', answer: '디자인' },
        {
            mbti: 'N',
            answer: '왜 저기에 걸지? 사셨나? 그렸나? \n근데 그림에 있는 과일 맛있게 생겼다.. 이따 집 가면서 사가야징>< ',
        },
        { mbti: 'I', answer: '아야..(아프지만 넘어간다)' },
        { mbti: 'F', answer: '헐 진짜 귀엽다! ' },
        { mbti: 'T', answer: '엇 저 사람들 왜 싸우지??' },
        { mbti: 'J', answer: '1층부터 정해진 방향대로 움직인다. ' },
        {
            mbti: 'S',
            answer: '아무렇지 않게 내가 고르려던 걸 골라서 계산하러 간다.',
        },
        { mbti: 'E', answer: '누구보다 열심히 참여해서 경품을 탄다' },
        { mbti: 'P', answer: '마음에 들어서 집어들었던 물건들' },
        { mbti: 'I', answer: '여긴 나만 알고 싶어! 다이어리에 끄적여놓는다.' },
    ];
    const [question, setQuestion] = useState('');
    const [answerA, setAnswerA] = useState('');
    const [answerB, setAnswerB] = useState('');
    const [array, setArray] = useState([]);
    const [count, setCount] = useState(0);
    const [isClick, setIsClick] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [result, setResult] = useState([]);
    const [clickedIndex, setClickedIndex] = useState(-1);
    useEffect(() => {
        setAnswerA(answerBoxA[count].answer);
        setAnswerB(answerBoxB[count].answer);
        setQuestion(questionBox[count]);
    }, []);

    const handleAnswerA = () => {
        setClickedIndex(clickedIndex + 1);
        if (count < 11) {
            setIsClick(true);
            console.log('1');
        }
        setTimeout(() => {
            if (count < 12) {
                setArray((prevArray) => [
                    { [answerBoxA[count].mbti]: answerA },
                    ...prevArray,
                ]);
            }
            console.log('3');
            if (count === 11) {
                setAnswerA(answerBoxA[11].answer);
                setAnswerB(answerBoxB[11].answer);
                setQuestion(
                    '가게를 나서려는 순간! 사장님이 당신에게 무언가를 건내주셨다! 과연 무엇일까?!'
                );
                setCount(count + 1);
            } else if (count > 11) {
                return;
            } else {
                setAnswerA(answerBoxA[count + 1].answer);
                setAnswerB(answerBoxB[count + 1].answer);
                setQuestion(questionBox[count + 1]);
                setIsClick(false);
                setCount(count + 1);
                console.log('4');
                console.log('카운트', count);
            }
            console.log('5');
            console.log(array);
        }, 100);
        console.log('2');
    };
    const handleAnswerB = () => {
        setClickedIndex(clickedIndex + 1);
        if (count < 11) {
            setIsClick(true);
        }
        setTimeout(() => {
            if (count < 12) {
                setArray((prevArray) => [
                    { [answerBoxB[count].mbti]: answerB },
                    ...prevArray,
                ]); // setState함수인 setArray는 비동기적으로 작동하기 때문에
                // 상태 업데이트를 한 직후에 상태를 확인할 수 없다. 그래서 다음 버튼 눌렀을 때에야 업데이트 된 상태를 확인가능
                // 값이 들어오긴 함 -> 마지막 8번 누르고 count가 8이되니까 조건문으로 결과보기 버튼 구현할 것.
                // 8번 답 누르면 결과보기 버튼 나오고(8번까지 저장된 상태) , 결과보기 버튼 누르면 그대로 전송 or 결과 계산
            }
            if (count === 11) {
                setAnswerA(answerBoxA[11].answer);
                setAnswerB(answerBoxB[11].answer);
                setQuestion(questionBox[11]);
                setCount(count + 1);
            } else if (count > 11) {
                return;
            } else {
                setAnswerA(answerBoxA[count + 1].answer);
                setAnswerB(answerBoxB[count + 1].answer);
                setQuestion(questionBox[count + 1]);
                setIsClick(false);
                setCount(count + 1);
            }
            console.log('array', array);
        }, 100);
    };

    const navigate = useNavigate();

    const handleResult = () => {
        setCount(13);
        setAnswerA(answerBoxA[11].answer);
        setAnswerB(answerBoxB[11].answer);
        setQuestion(questionBox[11]);
        setIsLoading(true);
        console.log('데이터', array);
        const choice = [];
        for (let j = 0; j < array.length; j++) {
            // choice.push(Object.values(array[j])); // 이렇게 하면 [['E'],['J']] 이런식으로
            //들어오니까 매우 주의할 것. 꼭 console찍어가면서 확인하기
            const values = Object.values(array[j]);
            choice.push(...values);
        }
        console.log('choice', choice);
        const updatedResult = [];
        const result = [];
        for (let i = 0; i < array.length; i++) {
            const keys = Object.keys(array[i]);
            updatedResult.push(...keys);
            //원래는 result라는 빈 배열을 state로 관리하여 key값들을 집어넣으려 하였으나
            //아무리 해도 값이 들어오지 않아서 그냥 쌩으로 집어넣음
        } // key 값 : 담긴 데이터의 mbti => 결과값 추출하기
        // setResult((prev) => [...updatedResult, ...prev]);//????작동 안 함.
        console.log(updatedResult);
        if (updatedResult.filter((item) => item === 'E').length >= 2) {
            result.push('E');
        }
        if (updatedResult.filter((item) => item === 'I').length >= 2) {
            result.push('I');
        }
        if (updatedResult.filter((item) => item === 'N').length >= 2) {
            result.push('N');
        }
        if (updatedResult.filter((item) => item === 'S').length >= 2) {
            result.push('S');
        }
        if (updatedResult.filter((item) => item === 'F').length >= 2) {
            result.push('F');
        }
        if (updatedResult.filter((item) => item === 'T').length >= 2) {
            result.push('T');
        }
        if (updatedResult.filter((item) => item === 'P').length >= 2) {
            result.push('P');
        }
        if (updatedResult.filter((item) => item === 'J').length >= 2) {
            result.push('J');
        }
        console.log(result);
        const data = result.join('');
        setTimeout(() => {
            navigate('/result', { state: { data } });
        }, 3000);
        // const postData = {
        //     choices: updatedResult,
        //     contents: choice,
        // };
        // console.log('answers', postData);
        // axios
        //     .post('http://127.0.0.1:8000/api/v1/mbti_get/answers/', postData)
        //     .then(() => console.log('데이터 전송완료'));
        // axios
        //     .post('http://127.0.0.1:8000/api/v1/mbti_get/results/', {
        //         mbti_result: data,
        //     })
        //     .then(() => {
        //         console.log('mbti값 전송 완료');
        //     });
    };

    return (
        <div>
            <StyledContainer className="container">
                <div
                    style={{
                        color: 'white',
                        fontWeight: '500',
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '40px',
                    }}
                >
                    <span style={{ display: 'inline-block', fontWeight: 700 }}>
                        {count === 13 ? 'Have A Good Day!' : 'Welcome To SOSO'}
                    </span>
                </div>
                <div style={{}}>
                    <div class="border"></div>
                    <div
                        class="galands"
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <div
                            class={`g1 basic ${
                                0 >= 0 - clickedIndex ? '' : 'opacity'
                            }`}
                        ></div>
                        <div
                            class={`g2 basic ${
                                0 >= 1 - clickedIndex ? '' : 'opacity'
                            }`}
                        ></div>
                        <div
                            class={`g3 basic ${
                                0 >= 2 - clickedIndex ? '' : 'opacity'
                            }`}
                        ></div>
                        <div
                            class={`g4 basic ${
                                0 >= 3 - clickedIndex ? '' : 'opacity'
                            }`}
                        ></div>
                        <div
                            class={`g5 basic ${
                                0 >= 4 - clickedIndex ? '' : 'opacity'
                            }`}
                        ></div>
                        <div
                            class={`g6 basic ${
                                0 >= 5 - clickedIndex ? '' : 'opacity'
                            }`}
                        ></div>
                        <div
                            class={`g7 basic ${
                                0 >= 6 - clickedIndex ? '' : 'opacity'
                            }`}
                        ></div>
                        <div
                            class={`g8 basic ${
                                0 >= 7 - clickedIndex ? '' : 'opacity'
                            }`}
                        ></div>
                        <div
                            class={`g9 basic ${
                                0 >= 8 - clickedIndex ? '' : 'opacity'
                            }`}
                        ></div>
                        <div
                            class={`g10 basic ${
                                0 >= 9 - clickedIndex ? '' : 'opacity'
                            }`}
                        ></div>
                        <div
                            class={`g11 basic ${
                                0 >= 10 - clickedIndex ? '' : 'opacity'
                            }`}
                        ></div>
                        <div
                            class={`g12 basic ${
                                0 >= 11 - clickedIndex ? '' : 'opacity'
                            }`}
                        ></div>
                    </div>
                </div>
                <Wrapper className="wrapper">
                    {/* <Progress progressCount={progressCount} /> */}
                    {isLoading ? (
                        <div>
                            <p
                                style={{
                                    color: 'white',
                                    fontSize: '30px',
                                    fontWeight: '500',
                                }}
                            >
                                Loading...
                            </p>
                        </div>
                    ) : (
                        <div className="box_container">
                            <QBox className="box_question">
                                <div>{question}</div>
                            </QBox>
                            <Grid
                                className={`grid ${isClick ? 'click' : 'next'}`}
                            >
                                {count === 12 ? (
                                    <ResultButtonWrapper>
                                        <ResultButton onClick={handleResult}>
                                            결과보기
                                        </ResultButton>
                                    </ResultButtonWrapper>
                                ) : (
                                    <div>
                                        <Box
                                            className="box_answer_1"
                                            handleClick={handleAnswerA}
                                            text={answerA}
                                        ></Box>
                                        <Box
                                            className="box_answer_2"
                                            handleClick={handleAnswerB}
                                            text={answerB}
                                        />
                                    </div>
                                )}
                            </Grid>
                        </div>
                    )}
                </Wrapper>
            </StyledContainer>
        </div>
    );
}
export default Container;
