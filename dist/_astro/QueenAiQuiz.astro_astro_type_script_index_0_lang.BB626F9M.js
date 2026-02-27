class i{constructor(){this.quotes=[],this.currentQuoteIndex=0,this.score=0,this.totalAttempts=0,this.currentQuote=null,this.hasAnswered=!1,this.elements={loadingState:document.getElementById("loading-state"),quizContent:document.getElementById("quiz-content"),quoteText:document.getElementById("quote-text"),quoteContext:document.getElementById("quote-context"),quoteThemes:document.getElementById("quote-themes"),contextText:document.getElementById("context-text"),episodeInfo:document.getElementById("episode-info"),answerButtons:document.getElementById("answer-buttons"),resultDisplay:document.getElementById("result-display"),resultIcon:document.getElementById("result-icon"),resultText:document.getElementById("result-text"),nextBtn:document.getElementById("next-btn"),quizStats:document.getElementById("quiz-stats"),currentScore:document.getElementById("current-score"),totalAttempts:document.getElementById("total-attempts"),accuracy:document.getElementById("accuracy"),progressText:document.getElementById("progress-text"),remainingText:document.getElementById("remaining-text"),progressBar:document.getElementById("progress-bar")},this.init()}async init(){try{const e=await(await fetch("/queen-ai-quiz.json")).json(),s=this.shuffleArray(e.quotes.filter(o=>o.isReal)).slice(0,10),n=this.shuffleArray(e.quotes.filter(o=>!o.isReal)).slice(0,10);this.quotes=this.shuffleArray([...s,...n]),this.elements.loadingState.classList.add("hidden"),this.elements.quizContent.classList.remove("hidden"),this.setupEventListeners(),this.displayCurrentQuote()}catch(t){console.error("Failed to load quiz data:",t),this.elements.loadingState.innerHTML=`
          <div class="text-center py-12">
            <p class="text-red-600 mb-4">Failed to load quiz data</p>
            <button onclick="location.reload()" class="px-4 py-2 bg-plum-500 text-white rounded hover:bg-plum-600">
              Try Again
            </button>
          </div>
        `}}shuffleArray(t){const e=[...t];for(let s=e.length-1;s>0;s--){const n=Math.floor(Math.random()*(s+1));[e[s],e[n]]=[e[n],e[s]]}return e}setupEventListeners(){document.getElementById("btn-queen").addEventListener("click",()=>this.handleAnswer(!0)),document.getElementById("btn-ai").addEventListener("click",()=>this.handleAnswer(!1)),this.elements.nextBtn.addEventListener("click",()=>this.nextQuestion())}displayCurrentQuote(){if(this.currentQuoteIndex>=this.quotes.length){this.showFinalResults();return}this.currentQuote=this.quotes[this.currentQuoteIndex],this.hasAnswered=!1,this.elements.quoteText.textContent=this.currentQuote.text,this.elements.answerButtons.classList.remove("hidden"),this.elements.resultDisplay.classList.add("hidden"),this.elements.quoteContext.classList.add("hidden"),this.updateProgress(),document.querySelectorAll("[data-answer]").forEach(t=>{t.classList.remove("opacity-50"),t.disabled=!1})}handleAnswer(t){if(this.hasAnswered)return;this.hasAnswered=!0,this.totalAttempts++;const e=t===this.currentQuote.isReal;e&&this.score++,this.showResult(e,this.currentQuote.isReal),document.querySelectorAll("[data-answer]").forEach(s=>{s.disabled=!0,s.dataset.answer==="real"===this.currentQuote.isReal&&s.classList.add("ring-4","ring-green-400")}),this.elements.answerButtons.classList.add("hidden"),this.elements.quoteContext.classList.remove("hidden"),this.displayContext(),this.updateStats()}showResult(t,e){this.elements.resultDisplay.classList.remove("hidden"),t?(this.elements.resultIcon.textContent="✅",this.elements.resultText.textContent=`Correct! This was ${e?"a real Queen quote":"AI generated"}.`,this.elements.resultText.className="text-xl font-heading font-bold mb-4 text-green-600"):(this.elements.resultIcon.textContent="❌",this.elements.resultText.textContent=`Oops! This was ${e?"a real Queen quote":"AI generated"}.`,this.elements.resultText.className="text-xl font-heading font-bold mb-4 text-red-600")}displayContext(){this.currentQuote.themes&&this.currentQuote.themes.length>0&&(this.elements.quoteThemes.innerHTML=this.currentQuote.themes.map(t=>`<span class="px-2 py-1 bg-plum-200 text-plum-800 text-xs rounded">${t.replace("-"," ")}</span>`).join(" ")),this.elements.contextText.textContent=this.currentQuote.context||"No additional context available.",this.currentQuote.isReal&&this.currentQuote.episode?(this.elements.episodeInfo.innerHTML=`
          From: Episode ${this.currentQuote.episode} - "${this.currentQuote.title}" 
          ${this.currentQuote.timestamp?`(${this.currentQuote.timestamp})`:""}
        `,this.elements.episodeInfo.classList.remove("hidden")):this.elements.episodeInfo.classList.add("hidden")}nextQuestion(){this.currentQuoteIndex++,this.displayCurrentQuote()}updateProgress(){const t=(this.currentQuoteIndex+1)/this.quotes.length*100,e=this.quotes.length-this.currentQuoteIndex-1;this.elements.progressText.textContent=`Quote ${this.currentQuoteIndex+1} of ${this.quotes.length}`,this.elements.remainingText.textContent=`${e} remaining`,this.elements.progressBar.style.width=`${t}%`}updateStats(){this.elements.quizStats.classList.remove("hidden"),this.elements.currentScore.textContent=this.score,this.elements.totalAttempts.textContent=this.totalAttempts;const t=this.totalAttempts>0?Math.round(this.score/this.totalAttempts*100):0;this.elements.accuracy.textContent=`${t}%`}showFinalResults(){const t=Math.round(this.score/this.totalAttempts*100);this.elements.quizContent.innerHTML=`
        <div class="text-center py-12">
          <h2 class="text-3xl font-heading font-bold text-plum-900 mb-6">Quiz Complete! 🎉</h2>
          
          <div class="bg-plum-50 rounded-lg p-8 max-w-md mx-auto mb-8">
            <div class="text-4xl mb-4">${t>=80?"👑":t>=60?"🤖":"🤔"}</div>
            <div class="text-2xl font-bold text-plum-900 mb-2">
              ${this.score}/${this.totalAttempts} Correct
            </div>
            <div class="text-lg text-plum-700">
              ${t}% Accuracy
            </div>
            <div class="mt-4 text-sm text-plum-600">
              ${t>=80?"Queen Expert! You know her voice well!":t>=60?"Pretty good! You can spot some patterns.":"Tricky, right? AI is getting quite good at mimicking!"}
            </div>
          </div>
          
          <div class="flex gap-4 justify-center">
            <button 
              onclick="location.reload()" 
              class="px-6 py-3 bg-plum-500 text-white font-heading font-bold rounded-lg hover:bg-plum-600 transition-colors"
            >
              Try Again
            </button>
            <a 
              href="/" 
              class="px-6 py-3 bg-amber-400 text-plum-900 font-heading font-bold rounded-lg hover:bg-amber-500 transition-colors no-underline"
            >
              Back to Home
            </a>
          </div>
        </div>
      `}}document.addEventListener("DOMContentLoaded",()=>{new i});
