'use strict';
const checks=[
'Сверил важные факты с учебником или надёжным источником',
'Проверил, существуют ли указанные ссылки и источники',
'Проверил даты, имена, цифры и определения',
'Сравнил ключевые утверждения с независимым источником',
'Убедился, что в ответе нет логических противоречий',
'Понял материал и могу объяснить его своими словами',
'Не передал ИИ личные или конфиденциальные данные'
];
const wrapper=document.querySelector('#check-items');
checks.forEach((s,i)=>{const label=document.createElement('label');label.className='checkitem';const input=document.createElement('input');input.type='checkbox';input.id='check-'+i;input.addEventListener('change',updateCheck);const span=document.createElement('span');span.textContent=s;label.append(input,span);wrapper.append(label)});
function updateCheck(){const n=[...wrapper.querySelectorAll('input')].filter(x=>x.checked).length;document.querySelector('#progress-count').textContent=n+' / '+checks.length;document.querySelector('#progress-fill').style.width=(n/checks.length*100)+'%';document.querySelector('#check-result').textContent=n===7?'Все пункты выполнены! Это снижает риск ошибок, но не гарантирует абсолютной точности.':n>=4?'Отличное начало! Осталось выполнить '+(checks.length-n)+' пункт(ов).':'Выполнено '+n+' из 7. Продолжай проверку.'}
document.querySelector('#reset-checks').addEventListener('click',()=>{wrapper.querySelectorAll('input').forEach(x=>x.checked=false);updateCheck()});updateCheck();
const questions=[
{q:'Может ли ИИ выдумать несуществующий источник?',a:['Нет, он всегда приводит реальные ссылки','Да, поэтому источники нужно проверять','Только когда нет интернета'],right:1},
{q:'Как лучше использовать ИИ при подготовке реферата?',a:['Копировать весь текст без изменений','Попросить объяснить тему и проверить факты','Не читать его ответ'],right:1},
{q:'ИИ уверенно сообщает неизвестный факт. Что делать?',a:['Довериться уверенной формулировке','Сразу включить факт в доклад','Найти подтверждение в надёжных источниках'],right:2},
{q:'Какие данные нежелательно отправлять ИИ-сервису?',a:['Общедоступное определение','Пароли и личные документы','Название учебного предмета'],right:1},
{q:'Как лучше развивать знания с помощью ИИ?',a:['Самостоятельно решать задачи и использовать ИИ для подсказок','Всегда просить готовый ответ','Запоминать только последний вывод'],right:0}
];
let index=0,selected=-1,score=0,answered=false,finished=false;
const qnum=document.querySelector('#question-number'),qtext=document.querySelector('#question-text'),options=document.querySelector('#question-options'),feedback=document.querySelector('#quiz-feedback'),next=document.querySelector('#quiz-next');
function render(){const q=questions[index];qnum.textContent='ВОПРОС '+(index+1)+' ИЗ '+questions.length;qtext.textContent=q.q;options.replaceChildren();q.a.forEach((answer,i)=>{const btn=document.createElement('button');btn.type='button';btn.className='choice';btn.textContent=answer;btn.addEventListener('click',()=>{if(answered)return;selected=i;[...options.children].forEach((b,j)=>b.classList.toggle('selected',j===i));next.disabled=false});options.append(btn)});feedback.textContent='Выбери один вариант ответа.';next.textContent='Ответить →';next.disabled=true;selected=-1;answered=false;finished=false}
next.addEventListener('click',()=>{if(finished){score=0;index=0;render();return}if(!answered){if(selected<0)return;answered=true;const correct=selected===questions[index].right;if(correct)score++;feedback.textContent=correct?'Верно!':'Не совсем. Правильный ответ: '+questions[index].a[questions[index].right];next.textContent=index===questions.length-1?'Узнать результат →':'Следующий вопрос →';return}index++;if(index<questions.length){render();return}finished=true;qnum.textContent='ТЕСТ ЗАВЕРШЁН';qtext.textContent='Результат: '+score+' из '+questions.length;options.replaceChildren();feedback.textContent=score===5?'Отлично! Ты умеешь осознанно использовать ИИ.':score>=3?'Неплохо! Повтори памятку и попробуй ещё раз.':'Посмотри памятку и чек-лист, а затем повтори тест.';next.textContent='Пройти ещё раз ↻';next.disabled=false});render();
