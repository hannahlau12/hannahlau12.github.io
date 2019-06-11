    
function pisPod(type, x, y, z){
    var
    nt = document.createElement('div'),
    ntA = document.createElement('a'),
    ntAImg = '<img class="svg" src=""/><img class="text" src="" />',
    target = document.querySelector(x),
    method = y,
	typeOfWork = type,
        
    //secondary
    secText = 'Made with <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="13.977px" height="12.564px" viewBox="3 3.718 13.977 12.564" enable-background="new 3 3.718 13.977 12.564" xml:space="preserve"><path fill="#FF3B3B" d="M13.052,3.718c-0.742,0-1.527,0.276-2.211,0.778C10.519,4.731,10.233,5.009,10,5.309 c-0.233-0.3-0.52-0.578-0.841-0.813C8.475,3.994,7.69,3.718,6.949,3.718C4.771,3.718,3,5.489,3,7.667 c0,1.127,0.367,2.285,1.091,3.441c0.562,0.897,1.342,1.797,2.317,2.679c1.525,1.377,3.034,2.261,3.332,2.43 c0.08,0.043,0.17,0.066,0.26,0.066s0.18-0.023,0.264-0.069c0.173-0.098,1.745-0.996,3.328-2.426c0.978-0.882,1.757-1.783,2.315-2.68 C16.633,9.951,17,8.792,17,7.667C17,5.489,15.229,3.718,13.052,3.718z"></path></svg> by ',
    secText_2 = 'han',
    secCont = document.createElement('span'),
    secLink = document.createElement('a'),
    secTgt = document.querySelector(z);

    // main
    nt.setAttribute('id', 'nt');
    ntA.setAttribute('href', 'https://www.instagram.com/hml.co/');
    ntA.innerHTML = ntAImg;
    nt.appendChild(ntA);
	if (typeOfWork == 'theme'){
		nt.setAttribute('class', 'th');
	}else if (typeOfWork == 'page'){
		nt.setAttribute('class', 'pg');
	}
    if(method == 'prepend'){
        target.insertBefore(nt, target.firstChild);
    }else if (method == 'append'){
        target.appendChild(nt);
    }
        
    //secondary
    secLink.setAttribute('href', 'https://www.instagram.com/hml.co/');
    secLink.innerHTML = secText_2;
    secCont.className = 'cr';
    secCont.innerHTML = secText;
    secCont.appendChild(secLink);
    if(secTgt){secTgt.appendChild(secCont);}
    else {
        var newSecTgt = document.createElement('div');
        newSecTgt.setAttribute('id', 'cr');
        newSecTgt.appendChild(secCont);
        document.querySelector('.wrapper').appendChild(newSecTgt);
    }
}
function adjustBlogrolls(){
    var 
    w = window.innerWidth,
    links = document.getElementsByClassName('more'),
    link = links[0],
    count = document.querySelector('.br-list').children;
    if (links.length > 0){
        if(w < 480 && count.length < 5){
            link.style.display = 'none'
        }else if(w > 480 && count.length < 7){
            link.style.display = 'none'
        }
        else if(w > 768 && count.length < 11){
            link.style.display = 'none'        
        }
        else{
            link.style.display = 'inline-block'
        }
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    var
    isTruncated = document.querySelector('.is-blogroll'),
    isCollapsible = document.querySelector('.is-collapsible');
	
    if(isTruncated){
        var
        blogroll = document.querySelector('.br-list'),
        blogrollChild = blogroll.children,
        parent = blogroll.parentElement,
        clone = parent.cloneNode(true),
        pop = document.querySelector('.pop');
        
        window.addEventListener('resize', adjustBlogrolls);
        if(blogrollChild.length > 4){
            var
            moreLink = document.createElement('a');
            parent.appendChild(moreLink);
			
            parent.lastElementChild.classList.add('more', 'cap');
            parent.lastElementChild.setAttribute('href','javascript:;');
            parent.querySelector('.more.cap').innerHTML = pop.getAttribute('data-blogroll');
            pop.querySelector('.pop-content').appendChild(clone);
            pop.querySelector('.section-title').innerHTML += ' (' + blogrollChild.length + ')';
			blogroll.style.maxHeight = blogrollChild[0].offsetHeight * 2 + 'px';
        }
        adjustBlogrolls();
        if(document.querySelector('.more')){
            document.querySelector('.more').addEventListener('click',function(){
                pop.classList.add('show');
                pop.addEventListener('click',function(e){
                    if(e.target == this){
                        this.classList.remove('show')
                    }else return;
                });
            });
        }
    }
    if(isCollapsible){
        var questions = document.querySelectorAll('.questions');
        questions.forEach(function(q){
            var
            question = q.querySelector('.q'),
            answer = q.querySelector('.a');
            question.addEventListener('click', function(){
                if(!q.classList.contains('active')){
                    q.classList.add('active');
                    answer.style.height = 'auto';
                    var height = answer.clientHeight + 'px';
                    answer.style.height = '0px';
                    setTimeout(function(){
                        answer.style.height = height;
                    },0);
                }else{
                    answer.style.height = '0px';
                    answer.addEventListener('transitionend', function(){
                        q.classList.remove('active');
                    },{once:true});
                }
            });
        });
    }
    pisPod('page', 'body','append','footer');
    tippy('[data-tippy-content]',{
        offset: "30, 20",
        followCursor: 'true',
        animation: 'shift-with-inertia',
        placement: 'top-end',
        duration: 300,
        delay: 150
    });
});
window.onload = function(){
    document.body.classList.add('loaded');
}
