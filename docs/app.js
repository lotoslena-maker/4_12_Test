const CONFIG = {
  RESULTS_ENDPOINT: "https://script.google.com/macros/s/AKfycbwRzz4Qg5Br1FWY8BbPtSnger8t3i1JOyKbRH6pQVTSAptOYiIgWT1PznUJyvhFY-hp/exec"
};

const questions = [
  {
    id:"q1",
    text:"Що найточніше описує Transfer Learning?",
    options:[
      ["a","Адаптація попередньо навченої моделі до нової задачі"],
      ["b","Навчання будь-якої моделі тільки з нуля"],
      ["c","Збереження набору даних у репозиторії"]
    ],
    correct:"a",
    explain:"Transfer Learning переносить уже набуті моделлю знання на нову, споріднену задачу."
  },
  {
    id:"q2",
    text:"Для яких даних особливо доречні RNN, LSTM та GRU?",
    options:[
      ["a","Тільки для статичних таблиць без порядку"],
      ["b","Для послідовних даних і часових рядів"],
      ["c","Лише для архівування файлів"]
    ],
    correct:"b",
    explain:"Рекурентні моделі враховують послідовність і попередній контекст."
  },
  {
    id:"q3",
    text:"Що робить механізм уваги (Attention) у Transformers?",
    options:[
      ["a","Автоматично видаляє всі помилки в даних"],
      ["b","Замінює вхідні дані випадковими значеннями"],
      ["c","Оцінює важливість різних частин вхідних даних для поточного результату"]
    ],
    correct:"c",
    explain:"Attention дозволяє моделі зосереджуватись на найбільш релевантних токенах або фрагментах."
  },
  {
    id:"q4",
    text:"Що таке Reward у reinforcement learning?",
    options:[
      ["a","Числовий сигнал, що оцінює наслідок дії агента"],
      ["b","Назва прихованого шару нейронної мережі"],
      ["c","Сховище попередньо навчених моделей"]
    ],
    correct:"a",
    explain:"Винагорода підказує агенту, наскільки корисною була дія щодо поставленої мети."
  },
  {
    id:"q5",
    text:"Для чого насамперед використовують AutoML?",
    options:[
      ["a","Для ручного малювання графіків"],
      ["b","Для автоматизації пошуку, вибору та налаштування моделей"],
      ["c","Для заміни всіх даних синтетичними"]
    ],
    correct:"b",
    explain:"AutoML автоматизує частину циклу моделювання: пошук алгоритмів, тюнінг і оцінювання кандидатів."
  },
  {
    id:"q6",
    text:"Яке завдання є типовим для MLOps після розгортання моделі?",
    options:[
      ["a","Лише одноразово зберегти модель і більше її не перевіряти"],
      ["b","Видалити метрики якості після запуску"],
      ["c","Моніторити якість, затримку, дрейф даних і стабільність роботи"]
    ],
    correct:"c",
    explain:"MLOps охоплює супровід моделі в експлуатації, включно з моніторингом і повторним навчанням."
  }
];

const state={index:0,answers:{},identity:{}};
const $=id=>document.getElementById(id);
const letters={a:"A",b:"Б",c:"В"};

$("identityForm").addEventListener("submit",e=>{
  e.preventDefault();
  state.identity={
    group:$("group").value.trim(),
    rank:$("rank").value.trim(),
    name:$("name").value.trim()
  };
  $("participant").textContent=state.identity.name;
  $("startScreen").classList.add("hidden");
  $("quizScreen").classList.remove("hidden");
  renderQuestion();
});

function renderQuestion(){
  const q=questions[state.index];
  $("questionCounter").textContent=`Питання ${state.index+1} з ${questions.length}`;
  $("progressBar").style.width=`${((state.index+1)/questions.length)*100}%`;
  $("questionText").textContent=q.text;
  $("answers").innerHTML="";
  q.options.forEach(([value,text])=>{
    const label=document.createElement("label");
    label.className="answer"+(state.answers[q.id]===value?" selected":"");
    label.innerHTML=`<input type="radio" name="answer" value="${value}" ${state.answers[q.id]===value?"checked":""}><span class="letter">${letters[value]}</span><span>${text}</span>`;
    label.addEventListener("click",()=>{
      state.answers[q.id]=value;
      renderQuestion();
    });
    $("answers").appendChild(label);
  });
  $("prevBtn").disabled=state.index===0;
  $("nextBtn").textContent=state.index===questions.length-1?"Завершити":"Далі →";
  $("nextBtn").disabled=!state.answers[q.id];
}

$("prevBtn").addEventListener("click",()=>{if(state.index>0){state.index--;renderQuestion();}});
$("nextBtn").addEventListener("click",async()=>{
  if(!state.answers[questions[state.index].id]) return;
  if(state.index<questions.length-1){state.index++;renderQuestion();return;}
  await finishQuiz();
});
$("retryBtn").addEventListener("click",()=>location.reload());

function endpointReady(){
  return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(CONFIG.RESULTS_ENDPOINT);
}

async function finishQuiz(){
  const score=questions.reduce((n,q)=>n+(state.answers[q.id]===q.correct?1:0),0);
  const percent=Math.round(score/questions.length*100);
  $("quizScreen").classList.add("hidden");
  $("resultScreen").classList.remove("hidden");
  $("scoreText").textContent=`${score}/${questions.length}`;
  $("percentText").textContent=`${percent}%`;
  $("resultTitle").textContent=percent>=80?"Чудовий результат!":percent>=60?"Добрий результат":"Матеріал варто ще раз переглянути";
  $("resultMessage").textContent="Дякуємо за проходження. Нижче можна швидко переглянути правильні відповіді.";
  renderReview();
  await sendResult(score,percent);
}

function renderReview(){
  $("review").innerHTML="";
  questions.forEach((q,i)=>{
    const chosen=state.answers[q.id];
    const correct=q.options.find(x=>x[0]===q.correct)[1];
    const ok=chosen===q.correct;
    const div=document.createElement("div");
    div.className="review-item"+(ok?"":" wrong");
    div.innerHTML=`<b>${i+1}. ${ok?"✓ Правильно":"✕ Неправильно"}</b><span>Правильна відповідь: ${correct}</span><div class="muted">${q.explain}</div>`;
    $("review").appendChild(div);
  });
}

async function sendResult(score,percent){
  const status=$("syncStatus");
  const payload={
    group:state.identity.group,
    rank:state.identity.rank,
    name:state.identity.name,
    score:String(score),
    percent:String(percent)
  };
  questions.forEach(q=>payload[q.id]=state.answers[q.id]);

  if(!endpointReady()){
    localStorage.setItem("4_12_last_result",JSON.stringify({...payload,savedAt:new Date().toISOString()}));
    status.textContent="Результат показано, але автоматичне збереження в Google Sheets ще не активоване викладачем.";
    return;
  }

  status.textContent="Зберігаємо результат…";
  try{
    const body=new URLSearchParams(payload);
    await fetch(CONFIG.RESULTS_ENDPOINT,{
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
      body:body.toString()
    });
    status.textContent="✓ Результат надіслано. Збереження можна перевірити в таблиці викладача.";
  }catch(err){
    localStorage.setItem("4_12_last_result",JSON.stringify({...payload,savedAt:new Date().toISOString()}));
    status.textContent="Не вдалося синхронізувати результат. Він тимчасово збережений на цьому пристрої.";
  }
}