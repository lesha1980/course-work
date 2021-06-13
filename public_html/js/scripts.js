function readJSONFromFile(file, callback){
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.overrideMimeType("application/json");
    xmlHttpRequest.open("GET", file, true);
    
    xmlHttpRequest.onreadystatechange = function(){
        if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200)
        {
           callback(xmlHttpRequest.responseText);
        }
    }

    xmlHttpRequest.send(null);
}

$( function() {
    $("#accordion1").accordion();
} );

$( function() {
    $( "#accordion2" ).accordion();
} );

$( function() {
    $( "#accordion3" ).accordion();
} );

$( function() {
    $( "#accordion4" ).accordion();
} );

$( function() {
    $( "#accordion5" ).accordion();
} );


window.addEventListener("DOMContentLoaded", function(){
     var file = "json/images.json";
     if(window.matchMedia("(max-width:1024px)").matches)
     { 
        readJSONFromFile(file, function(text){
            if(window.matchMedia("(max-width:320px)").matches)
            {
                var list = JSON.parse(text);
                pages = list.length;
                var rigntBlockPages = document.querySelectorAll(".right-block__pages")[1];
                rigntBlockPages.innerHTML = "1/"+pages;
            }
            else{
               var imgGalleryNodes = document.querySelectorAll(".picture-img1");
               console.log(imgGalleryNodes);
               currentSetLength = imgGalleryNodes.length;
               var list = JSON.parse(text);
               pages = Math.round(list.length/currentSetLength);
               var rigntBlockPages = document.querySelector(".right-block__pages");
               rigntBlockPages.innerHTML = "1/"+pages;
            }
      })
     }   
     else{
        readJSONFromFile(file, function(text){
              var imgGalleryNodes = document.querySelectorAll(".picture-img");
              currentSetLength = imgGalleryNodes.length;
              var list = JSON.parse(text);
              pages = Math.round(list.length/currentSetLength);
              var rigntBlockPages = document.querySelector(".right-block__pages");
              rigntBlockPages.innerHTML = "1/"+pages;
        })
    }

   
    swiperContainer = document.getElementById("swiper-container");
    hammer = new Hammer(swiperContainer);

    hammer.on("swipeleft", function(e){
       readJSONFromFile(file, function(json){
           var list = JSON.parse(json);
           var count = list.length;
           imgGalleryNode = document.querySelector(".picture-img2");
           pages = list.length;
           var rightBlockPages = document.querySelectorAll(".right-block__pages")[1];
           var text = rightBlockPages.innerHTML;
         
           if(text.split("/")[0] >= 1 && text.split("/")[0] < pages)
           {
              
               var currentPage = parseInt(text.split("/")[0]);
               var next = currentPage;
               var start = currentPage - 1;

               for(var i = start; i <= next; i++)
               {
                  var obj = list[i];
                  try{
                       imgGalleryNode.setAttribute("src", obj["mobile"]);
                  }
                  catch {

                  }
               
               }

               rightBlockPages.innerHTML = (currentPage + 1) + "/" + pages;

           }
             
           
       })
    });

    hammer.on("swiperight", function(e){
        readJSONFromFile(file, function(json){
           var list = JSON.parse(json);
           var count = list.length;
           
           imgGalleryNode = document.querySelector(".picture-img2");
           pages = list.length;
           var rightBlockPages = document.querySelectorAll(".right-block__pages")[1];
           var text = rightBlockPages.innerHTML;
          
           if(text.split("/")[0] > 1 && text.split("/")[0] <= pages)
           {
               var currentPage = parseInt(text.split("/")[0]);
               var start = currentPage - 1;

               for(var i = start; i >= start - 1; i--)
               {
                  var obj = list[i];
                  try{
                       imgGalleryNode.setAttribute("src", obj["mobile"]);
                  }
                  catch {

                  }
               
               }

               rightBlockPages.innerHTML = (currentPage - 1) + "/" + pages;

           }
       

       })
    });

    var telSelector = document.querySelector("input[type='tel']");
    var mask = new Inputmask("+7(999)-999-99-99");
    mask.mask(telSelector);

    new JustValidate(".section__contacts-form-feedback",{
          rules: {
              name: {
                  required: true,
                  minLength: 2,
                  maxLength: 30
              },
              tel: {
                  required: true,
                  function: (name, value)=>{
                   var phone = telSelector.inputmask.unmaskedvalue();
                   return Number(phone) && phone.length == 10;
                  }
              }
              
          },

          messages: {
             name: {
                 required: "Поле Имя обязательно для заполнения!",
                 minLength: "Минимальное число символов для имени 2",
                 maxLength: "Максимальное число символов для имени 30"
             },
             tel: {
                 required: "Поле Телефон обязательно для заполнения!",
                 function: "Неверный формат ввода номера телефона"
             }
          }
    });
    

    var listEdition = document.querySelector(".list-edition__desktop");
    if(window.matchMedia("(max-width:1300px)").matches)
    {
        listEdition = document.querySelector(".list-edition__tablet");
    }
    var pagesEdition = document.querySelector(".edition__pages");
    pagesEdition.innerHTML = "1/" + listEdition.children.length;

    ymaps.ready(function () {
        var yMap1 = new ymaps.Map("map1", {
          center: [55.761512, 37.624462],
          zoom: 14
        });

        var yMap = new ymaps.Map("map", {
            center: [55.761512, 37.624462],
            zoom: 14
          });

        yMap1.controls.remove('smallMapDefaultSet');
        yMap1.controls.remove('trafficControl');
        yMap.controls.remove('smallMapDefaultSet');
        yMap.controls.remove('trafficControl');

        var Label = new ymaps.Circle([
            [55.758468, 37.601088],
            40],
            {
                fillColor: "#9D5CD0"

            });

        yMap.geoObjects.add(Label);

        var Label1 = new ymaps.Circle([
                [55.758468, 37.601088],
                40],
                {
                    fillColor: "#9D5CD0"
    
                });
    
        yMap1.geoObjects.add(Label1);
      });
    
    /*-----------------------------------------функции шапки-----------------------------------------------------*/
     document.querySelectorAll(".header__art-nav-default-text").forEach(function(el){
          el.addEventListener("click", function(ev){
            parent = el.parentElement;
            for(var i = 0; i <= parent.children.length - 1; i ++){
                
                if(parent.children[i].classList.contains("header__art-nav-dropdown-field"))
                {
                    if(!parent.children[i].style.opacity || parent.children[i].style.opacity == "0" )
                    {
                        document.querySelectorAll(".header__art-nav-dropdown-field").forEach(function(e){
                            e.style.opacity = "0";
                        });
                        parent.children[i].style.opacity = "1";
                    }
                    else {
                        parent.children[i].style.opacity = "0";
                    }
                    for(var k = 0; k <= parent.children[i].children.length - 1; k++)
                    {
                        if(parent.children[i]. children[k].classList.contains("header__art-nav-list-dropdown"))
                        {
                           
                            if(!parent.children[i].children[k].style.height || parent.children[i].children[k].style.height == "0px" ){
                                document.querySelectorAll(".header__art-nav-list-dropdown").forEach(function(elem){
                                    elem.style.height = "0";
                                    elem.style.opacity = "0";
                                });

                                parent.children[i].children[k].style.height = "225px";
                                parent.children[i].children[k].style.opacity = "1";
                                
                                
         
                             }
                             else {
                                parent.children[i].children[k].style.height = "0";
                                parent.children[i].children[k].style.opacity = "0";
                                
                             }
                        }
                    }
                     
                }
            }
            
          })
          
     })

     document.querySelector(".header__input-search").addEventListener("mouseover", function(e){
        targEl = document.querySelector(".header__search-img");
        targEl.style.backgroundImage = "var(--blanchard-search-desktop-hover)";
     })

     document.querySelector(".header__input-search").addEventListener("mouseleave", function(e){
        targEl = document.querySelector(".header__search-img");
        targEl.style.backgroundImage = "var(--blanchard-search-desktop)";
            
     })

     document.querySelector(".header__input-search").addEventListener("click", function(e){
        var el;
        if(e.path)
        {
           el = e.path[0];
        }
        else {
           el = e.target;
        }
        el.style.caretColor = "var(--blanchard-hover-element-color)";
        el.setAttribute("placeholder", "");
        targEl = document.querySelector(".header__search-img");
        targEl.style.backgroundImage = "var(--blanchard-search-desktop-hover)";

     })

     document.querySelector(".header__input-search").addEventListener("blur", function(e){
        var el;
        if(e.path)
        {
           el = e.path[0];
        }
        else {
           el = e.target;
        }
        el.setAttribute("placeholder", "Поиск по сайту"); 
       
        targEl = document.querySelector(".header__search-img");
        targEl.style.backgroundImage = "var(--blanchard-search-desktop)";
           
  })

  
  document.querySelector(".header__tablet-search-img").addEventListener("click", function(e){

        el = document.querySelector(".header__tablet-search-img");
        logo = document.querySelector(".header__logo");
        burger = document.querySelector(".header__burger-container");
        headerTabletSearch = document.querySelector(".header__tablet-search");
        headerTabletSearchInput = document.querySelector(".header__tablet-search-input");
        headerSearchClose = document.querySelector(".header__search-close");
        headerTabletSearchInput.classList.toggle("header__tablet-search-input-active");
        

        elem = document.querySelector(".header__tablet-search-form");
        elem.classList.toggle("header__tablet-search-form-active");
      
        if(window.matchMedia("(max-width:768px)").matches){
            
            if(!logo.style.display || logo.style.display == "block")
            {
                logo.style.display = "none";
                burger.style.display = "none";
                headerTabletSearch.style.flexBasis = "100%";
                headerSearchClose.style.display = "block";

                headerTabletSearchInput.style.borderBottom = "1px solid var(--blanchard-text-color)";
            }
            else if(logo.style.display == "none")
            {
                logo.style.display = "block";
                burger.style.display = "block";
                headerTabletSearch.style.flexBasis = "4.5%";
                headerSearchClose.style.display = "none";
               
                headerTabletSearchInput.style.borderBottom = "0 solid var(--blanchard-text-color)";
                         
            }

            if(headerTabletSearch.style.flexBasis == "100%")
            {
                el.style.backgroundImage = "var(--blanchard-search-tablet-active)";
            }
            else if (headerTabletSearch.style.flexBasis = "4.5%" || !headerTabletSearch.style.flexBasis)
            {
                el.style.backgroundImage = "var(--blanchard-search-tablet)";
            }

        }
        else if(window.matchMedia("(max-width:1024px)").matches){
    
           
           if(headerTabletSearchInput.classList.contains("header__tablet-search-input-active"))
           {
              el.style.backgroundImage = "var(--blanchard-search-tablet-active)";
              el.style.backgroundPositionX = "0";
              headerTabletSearchInput.style.width = "var(--blanchard-header-search-input-width)";
              headerTabletSearchInput.style.borderBottom = "1px solid var(--blanchard-text-color)";
              logo.style.backgroundPositionX = "right";
           }
           else if(!headerTabletSearchInput.classList.contains("header__tablet-search-input-active"))
           {
              el.style.backgroundImage = "var(--blanchard-search-tablet)";
              el.style.backgroundPositionX = "10px";
              headerTabletSearchInput.style.width = "0";
              headerTabletSearchInput.style.borderBottom = "0 solid var(--blanchard-text-color)";
              logo.style.backgroundPositionX = "center";
           }

           el1 = document.querySelector("header__tablet-search-input");
           el1.style.cursorColor = "#9D5CD0";
      }
      if(window.matchMedia("(max-width:320px)").matches)
        {
            header = document.querySelector(".header");
            headerContainer = document.querySelector(".header__container");
            headerTop = document.querySelector(".header__top");
            headerTabletSearch.classList.toggle("header__tablet-search-active");
            el.classList.toggle("header__tablet-search-img-active");
            
            
            if(!logo.style.display || logo.style.display == "block")
            {
                header.style.height = "calc(var(--blanchard-header-height) - 117px)";
                headerContainer.style.height = "calc(var(--blanchard-header-height) - 117px)";
                headerTop.style.height = "calc(var(--blanchard-header-height) - 117px)";
                el.style.backgroundImage = "var(--blanchard-search-mobile)";
               
            }
            else if(logo.style.display == "none")
            {
                header.style.height = "calc(var(--blanchard-header-height) - 87px)";
                headerContainer.style.height = "calc(var(--blanchard-header-height) - 87px)";
                headerTop.style.height = "calc(var(--blanchard-header-height) - 87px)";
                el.style.backgroundImage = "var(--blanchard-search-mobile-active)";
               
            }
    
            el1 = document.querySelector("header__tablet-search-input");
            el1.style.cursorColor = "#9D5CD0";
        }
    
  })

  document.querySelector(".header__search-close").addEventListener("click", function(e){
    if(window.matchMedia("(max-width:768px)").matches){
        logo = document.querySelector(".header__logo");
        burger = document.querySelector(".header__burger-container");
        headerTabletSearch = document.querySelector(".header__tablet-search");
        headerTabletSearchInput = document.querySelector(".header__tablet-search-input");
        el = document.querySelector(".header__tablet-search-img");
        el1 = document.querySelector(".header__tablet-search-form");

        headerTabletSearchInput.classList.toggle("header__tablet-search-input-active");
        el1.classList.toggle("header__tablet-search-form-active");
        logo.style.display = "block";
        burger.style.display = "block";
        headerTabletSearch.style.flexBasis = "4.5%";
        headerSearchClose.style.display = "none";
        headerTabletSearchInput.style.width = "0";
        headerTabletSearchInput.style.borderBottom = "0 solid var(--blanchard-text-color)";
        el.style.backgroundImage = "var(--blanchard-search-tablet)";
    }

    if(window.matchMedia("(max-width:320px)").matches){
        header = document.querySelector(".header");
        headerContainer = document.querySelector(".header__container");
        headerTop = document.querySelector(".header__top");
        headerTabletSearch.classList.toggle("header__tablet-search-active");

       
        header.style.height = "calc(var(--blanchard-header-height) - 117px)";
        headerContainer.style.height = "calc(var(--blanchard-header-height) - 117px)";
        headerTop.style.height = "calc(var(--blanchard-header-height) - 117px)";
        headerTabletSearchInput.style.width = "0";
       
        el.style.backgroundImage = "var(--blanchard-search-mobile)";

    }
  })


  document.querySelector(".header__burger-menu").addEventListener("click", function(e){ 
       el = document.querySelector(".header__burger-main");
       el.style.height = "var(--blanchard-header-burger-open-height)";
       el.style.width = "var(--blanchard-header-burger-open-width)";
       el.style.opacity = "1";
       el.style.zIndex = "10";

  })

  document.querySelector(".header__burger-nav-close").addEventListener("click", function(e){
       el = document.querySelector(".header__burger-main");
       el.style.height = "0";
       el.style.width = "0";
       el.style.opacity = "0";
       el.style.zIndex = "-10";

  })
     
    /*-----------------------------------------функции шапки-----------------------------------------------------*/
    /*------------------------------------------hero блок---------------------------------------------------------*/
    
    const swiper1 = new Swiper('.swiper-container-events', {
        // Optional parameters
        direction: 'horizontal',
        effect: "flip",
        loop: true,
        pagination: {
            el: '.swiper-pagination-events',
          },
       
      });
    
     const swiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        speed: 1000,
        
        autoplay: {
           delay: 30000,
        },

       
      });


      swiper.on('slideChange', function(e){

          document.querySelectorAll(".swiper-slide").forEach(function(el){
               if(el.classList.contains("slide-active-anim"))
               {
                   el.classList.remove("slide-active-anim");
               }
          });
          var el;
          if(e.realIndex == 1)
          {
             document.querySelectorAll(".slide2").forEach(function(el){
                 el.classList.add("slide-active-anim");
             });
          }
          else if(e.realIndex == 2)
          {
            document.querySelectorAll(".slide3").forEach(function(el){
                el.classList.add("slide-active-anim");
            });
          }
          else if(e.realIndex == 0)
          {
            document.querySelectorAll(".slide1").forEach(function(el){
                el.classList.add("slide-active-anim");
            });
          }
         

          
      })

      document.querySelectorAll(".list-partners__img").forEach(function(el){
          el.addEventListener("mouseover", function(e){
               if(el.dataset.img == 1)
               {
                   el.setAttribute("src", "/course-work/img/partner1_color.png");
                   srcset = el.getAttribute("srcset");
                   newset = srcset.replace("/course-work/img/partner1.png 450w", "/course-work/img/partner1_color.png 450w");
                   el.setAttribute("srcset", newset);
               }
               if(el.dataset.img == 2)
               {
                   el.setAttribute("src", "/course-work/img/partner2_color.png");
                   srcset = el.getAttribute("srcset");
                   newset = srcset.replace("/course-work/img/partner2.png 450w", "/course-work/img/partner2_color.png 450w");
                   el.setAttribute("srcset", newset);
               }
               if(el.dataset.img == 3)
               {
                   el.setAttribute("src", "/course-work/img/partner3_color.png");
                   srcset = el.getAttribute("srcset");
                   newset = srcset.replace("/course-work/img/partner3.png 450w", "/course-work/img/partner3_color.png 450w");
                   el.setAttribute("srcset", newset);
               }
               if(el.dataset.img == 4)
               {
                   el.setAttribute("src", "/course-work/img/partner4_color.png");
                   srcset = el.getAttribute("srcset");
                   newset = srcset.replace("/course-work/img/partner4.png 450w", "/course-work/img/partner4_color.png 450w");
                   el.setAttribute("srcset", newset);
               }
               if(el.dataset.img == 5)
               {
                   el.setAttribute("src", "/course-work/img/partner5_color.png");
                   srcset = el.getAttribute("srcset");
                   newset = srcset.replace("/course-work/img/partner5.png 450w", "/course-work/img/partner5_color.png 450w");
                   el.setAttribute("srcset", newset);
               }
               if(el.dataset.img == 6)
               {
                   el.setAttribute("src", "/course-work/img/partner6_color.png");
                   srcset = el.getAttribute("srcset");
                   newset = srcset.replace("/course-work/img/partner6.png 450w", "/course-work/img/partner6_color.png 450w");
                   el.setAttribute("srcset", newset);
               }

               if(el.dataset.img == 7)
               {
                   el.setAttribute("src", "/course-work/img/partner7_color.png");
                   srcset = el.getAttribute("srcset");
                   newset = srcset.replace("/course-work/img/partner7.png 450w", "/course-work/img/partner7_color.png 450w");
                   el.setAttribute("srcset", newset);
               }
               if(el.dataset.img == 8)
               {
                   el.setAttribute("src", "/course-work/img/partner8_color.png");
                   srcset = el.getAttribute("srcset");
                   newset = srcset.replace("/course-work/img/partner8.png 450w", "/course-work/img/partner8_color.png 450w");
                   el.setAttribute("srcset", newset);
               }
               if(el.dataset.img == 9)
               {
                   el.setAttribute("src", "/course-work/img/partner9_color.png");
                   srcset = el.getAttribute("srcset");
                   newset = srcset.replace("/course-work/img/partner9.png 450w", "/course-work/img/partner9_color.png 450w");
                   el.setAttribute("srcset", newset);
               }

          })

          el.addEventListener("mouseleave", function(e){
            if(el.dataset.img == 1)
            {
                el.setAttribute("src", "/course-work/img/partner1.png");
                srcset = el.getAttribute("srcset");
                newset = srcset.replace("/course-work/img/partner1_color.png 450w", "/course-work/img/partner1.png 450w");
                el.setAttribute("srcset", newset);
            }
            if(el.dataset.img == 2)
            {
                el.setAttribute("src", "/course-work/img/partner2.png");
                srcset = el.getAttribute("srcset");
                newset = srcset.replace("/course-work/img/partner2_color.png 450w", "/course-work/img/partner2.png 450w");
                el.setAttribute("srcset", newset);
            }
            if(el.dataset.img == 3)
            {
                el.setAttribute("src", "/course-work/img/partner3.png");
                srcset = el.getAttribute("srcset");
                newset = srcset.replace("/course-work/img/partner3_color.png 450w", "/course-work/img/partner3.png 450w");
                el.setAttribute("srcset", newset);
            }
            if(el.dataset.img == 4)
            {
                el.setAttribute("src", "/course-work/img/partner4.png");
                srcset = el.getAttribute("srcset");
                newset = srcset.replace("/course-work/img/partner4_color.png 450w", "/course-work/img/partner4.png 450w");
                el.setAttribute("srcset", newset);
            }
            if(el.dataset.img == 5)
            {
                el.setAttribute("src", "/course-work/img/partner5.png");
                srcset = el.getAttribute("srcset");
                newset = srcset.replace("/course-work/img/partner5_color.png 450w", "/course-work/img/partner5.png 450w");
                el.setAttribute("srcset", newset);
            }
            if(el.dataset.img == 6)
            {
                el.setAttribute("src", "/course-work/img/partner6.png");
                srcset = el.getAttribute("srcset");
                newset = srcset.replace("/course-work/img/partner6_color.png 450w", "/course-work/img/partner6.png 450w");
                el.setAttribute("srcset", newset);
            }

            if(el.dataset.img == 7)
            {
                el.setAttribute("src", "/course-work/img/partner7.png");
                srcset = el.getAttribute("srcset");
                newset = srcset.replace("/course-work/img/partner7_color.png 450w", "/course-work/img/partner7.png 450w");
                el.setAttribute("srcset", newset);
            }
            if(el.dataset.img == 8)
            {
                el.setAttribute("src", "/course-work/img/partner8.png");
                srcset = el.getAttribute("srcset");
                newset = srcset.replace("/course-work/img/partner8_color.png 450w", "/course-work/img/partner8.png 450w");
                el.setAttribute("srcset", newset);
            }
            if(el.dataset.img == 9)
            {
                el.setAttribute("src", "/course-work/img/partner9.png");
                srcset = el.getAttribute("srcset");
                newset = srcset.replace("/course-work/img/partner9_color.png 450w", "/course-work/img/partner9.png 450w");
                el.setAttribute("srcset", newset);
            }

          })
      })

      document.querySelector(".section__projects-partner-left-paging-desktop").addEventListener("click", function(e){
        var el = document.getElementsByClassName("list-item__partners-active");
        
        if(el[0].previousElementSibling != null)
        {
            el[0].previousElementSibling.classList.add("list-item__partners-active");
            el[1].classList.remove("list-item__partners-active");
        }
      })

      document.querySelector(".section__projects-partner-left-paging-tablet").addEventListener("click", function(e){
        
        var el = document.getElementsByClassName("list-item__partners-active-tablet");
        
        if(el[0].previousElementSibling != null)
        {
            el[0].previousElementSibling.classList.add("list-item__partners-active-tablet");
            el[1].classList.remove("list-item__partners-active-tablet");
        }
      })

      document.querySelector(".section__projects-partner-left-paging-mobile").addEventListener("click", function(e){
        
        var el = document.getElementsByClassName("list-item__partners-active-mobile");
        
        if(el[0].previousElementSibling != null)
        {
            el[0].previousElementSibling.classList.add("list-item__partners-active-mobile");
            el[1].classList.remove("list-item__partners-active-mobile");
        }
      })

      document.querySelector(".section__projects-partner-right-paging-desktop").addEventListener("click", function(e){
           var el = document.getElementsByClassName("list-item__partners-active");
    
           if(el[0].nextElementSibling != null)
           {
               el[0].nextElementSibling.classList.add("list-item__partners-active");
               el[0].classList.remove("list-item__partners-active");
           }
    
      })

      document.querySelector(".section__projects-partner-right-paging-tablet").addEventListener("click", function(e){
        
        var el = document.getElementsByClassName("list-item__partners-active-tablet");
 
        if(el[0].nextElementSibling != null)
        {
            el[0].nextElementSibling.classList.add("list-item__partners-active-tablet");
            el[0].classList.remove("list-item__partners-active-tablet");
        }
 
   })

   document.querySelector(".section__projects-partner-right-paging-mobile").addEventListener("click", function(e){
   
    var el = document.getElementsByClassName("list-item__partners-active-mobile");

    if(el[0].nextElementSibling != null)
    {
        el[0].nextElementSibling.classList.add("list-item__partners-active-mobile");
        el[0].classList.remove("list-item__partners-active-mobile");
    }

})

      document.querySelector(".edition__left-arrow").addEventListener("click", function(e){
        var pages = document.querySelector(".edition__pages");
        var text = pages.innerHTML;
        var val = text.split("/")[0];
        var count = text.split("/")[1];
        if(val > 1 && val <= count)
        {
            valInt = parseInt(val);
            var ulEdition = document.querySelector(".list-edition__list-cards");
            var activeCurrent = document.querySelector(".list-edition__item-card-active");
            if(window.matchMedia("(max-width:1300px)").matches) {
                ulEdition = document.querySelector(".list-edition__tablet");
                activeCurrent = document.querySelector(".list-edition__item-card-active-tablet");
            }
            var next = ulEdition.children[valInt - 2];
            if(!window.matchMedia("(max-width:1300px)").matches) {
                activeCurrent.classList.remove("list-edition__item-card-active");
            }
              
            if(window.matchMedia("(max-width:1300px)").matches) {
                activeCurrent.classList.remove("list-edition__item-card-active-tablet");
            }
            
            activeCurrent.style.zIndex = "0";
            if(window.matchMedia("(max-width:1300px)").matches){
                next.classList.add("list-edition__item-card-active-tablet");
            }
            else{
                next.classList.add("list-edition__item-card-active");
            }
           
            next.style.zIndex = "1";

            valInt -= 1;
            pages.innerHTML = valInt + "/" + count;

        }
      })

      document.querySelector(".edition__right-arrow").addEventListener("click", function(e){
        var pages = document.querySelector(".edition__pages");
        var text = pages.innerHTML;
        var val = text.split("/")[0];
        var count = text.split("/")[1];
        if(val >= 1 && val < count)
        {
            valInt = parseInt(val);
            var ulEdition = document.querySelector(".list-edition__list-cards");
            var activeCurrent = document.querySelector(".list-edition__item-card-active");
            if(window.matchMedia("(max-width:1300px)").matches) {
                ulEdition = document.querySelector(".list-edition__tablet");
                activeCurrent = document.querySelector(".list-edition__item-card-active-tablet");
            }
            var next = ulEdition.children[valInt];
            
            if(!window.matchMedia("(max-width:1300px)").matches) {
                activeCurrent.classList.remove("list-edition__item-card-active");
            }
            if(window.matchMedia("(max-width:1300px)").matches) {
                   
                activeCurrent.classList.remove("list-edition__item-card-active-tablet");
            }
         
            activeCurrent.style.zIndex = "0";
            if(window.matchMedia("(max-width:1300px)").matches){
                next.classList.add("list-edition__item-card-active-tablet");
            }
            else{
                next.classList.add("list-edition__item-card-active");
            }
            next.style.zIndex = "1";

            valInt += 1;
            pages.innerHTML = valInt + "/" + count;

        }
      })

     document.querySelector(".right-block__left-arrow").addEventListener("click", function(e){
        readJSONFromFile(file, function(json){
            var list = JSON.parse(json);
            var pages;
            var imgGalleryNodes;
            if(window.matchMedia("(max-width:1024px)").matches)
            {
                imgGalleryNodes = document.querySelectorAll(".picture-img1");
                const currentSetLength = imgGalleryNodes.length;
                pages = Math.round(list.length / currentSetLength);
                var rightBlockPages = document.querySelector(".right-block__pages");
                var text = rightBlockPages.innerHTML;
                if(text.split("/")[0]> 1 && text.split("/")[0] <= pages)
                {
                    var currentPage = parseInt(text.split("/")[0]);
                 
                    var next = ((currentPage - 2)* currentSetLength);
                    var start = ((currentPage - 1)* currentSetLength) - 1;
                    var j = 0;
                    for(var i = start; i >= next; j++, i--)
                    {
                       var obj = list[i];
                      try{
                        if(window.matchMedia("(max-width: 768px)").matches)
                        {
                        
                            imgGalleryNodes[j].setAttribute("src", obj["res768"]);
                            imgGalleryNodes[j].setAttribute("srcset", obj["mobile"] + " 290w");
                            imgGalleryNodes[j].setAttribute("sizes", "(max-width: 320px) 290px");
                        }
                        else {
                          imgGalleryNodes[j].setAttribute("src", obj["tablet"]);
                          imgGalleryNodes[j].setAttribute("srcset", obj["res768"] + " 317w");
                        }
                      }
                      catch{

                      }
                    }
    
                    rightBlockPages.innerHTML = (currentPage - 1) + "/" + pages;
                }
            }
            else {
                imgGalleryNodes = document.querySelectorAll(".picture-img");
                const currentSetLength = imgGalleryNodes.length;
                pages = Math.round(list.length / currentSetLength);
                var rightBlockPages = document.querySelector(".right-block__pages");
                var text = rightBlockPages.innerHTML;
                if(text.split("/")[0] > 1 && text.split("/")[0] <= pages)
                {
                    var currentPage = parseInt(text.split("/")[0]);
                 
                    var next = ((currentPage - 2)* currentSetLength);
                    var start = ((currentPage - 1)* currentSetLength) - 1;
                    var j = 0;
                    for(var i = start; i >= next; j++, i--)
                    {
                       var obj = list[i];
                       try{
                           imgGalleryNodes[j].setAttribute("src", obj["desktop"]);
                       }
                       catch{
                           
                       }
                    }
    
                    rightBlockPages.innerHTML = (currentPage - 1) + "/" + pages;
                }
            }

        })
     });

     document.querySelector(".left-mobile-arrow").addEventListener("click", function(e){
        readJSONFromFile(file, function(json){
            var list = JSON.parse(json);
            var pages;
           if(window.matchMedia("(max-width: 320px)").matches)
            {
                imgGalleryNode = document.querySelector(".picture-img2");
                pages = list.length;
                var rightBlockPages = document.querySelectorAll(".right-block__pages")[1];
                var text = rightBlockPages.innerHTML;
               
                if(text.split("/")[0] > 1 && text.split("/")[0] <= pages)
                {
                    var currentPage = parseInt(text.split("/")[0]);
                    var start = currentPage - 1;

                    for(var i = start; i >= start - 1; i--)
                    {
                       var obj = list[i];
                       try{
                            imgGalleryNode.setAttribute("src", obj["mobile"]);
                       }
                       catch {

                       }
                    
                    }

                    rightBlockPages.innerHTML = (currentPage - 1) + "/" + pages;

                }
            }

        })
     })

     document.querySelector(".right-mobile-arrow").addEventListener("click", function(e){
        readJSONFromFile(file, function(json){
            var list = JSON.parse(json);
            var pages;
           if(window.matchMedia("(max-width: 320px)").matches)
            {
                imgGalleryNode = document.querySelector(".picture-img2");
                pages = list.length;
                var rightBlockPages = document.querySelectorAll(".right-block__pages")[1];
                var text = rightBlockPages.innerHTML;
              
                if(text.split("/")[0] >= 1 && text.split("/")[0] < pages)
                {
                   
                    var currentPage = parseInt(text.split("/")[0]);
                    var next = currentPage;
                    var start = currentPage - 1;

                    for(var i = start; i <= next; i++)
                    {
                       var obj = list[i];
                       try{
                            imgGalleryNode.setAttribute("src", obj["mobile"]);
                       }
                       catch {

                       }
                    
                    }

                    rightBlockPages.innerHTML = (currentPage + 1) + "/" + pages;

                }
            }

        })
     })

     document.querySelector(".right-block__right-arrow").addEventListener("click", function(e){
         readJSONFromFile(file, function(json){
            var list = JSON.parse(json);
            var pages;
            var imgGalleryNodes;
         
            if(window.matchMedia("(max-width: 1024px)").matches)
            {
            
                imgGalleryNodes = document.querySelectorAll(".picture-img1");
                const currentSetLength = imgGalleryNodes.length;
                pages = Math.round(list.length / currentSetLength);
                var rightBlockPages = document.querySelector(".right-block__pages");
                var text = rightBlockPages.innerHTML;
                if(text[0] >= 1 && text.split("/")[0]  < pages)
                {
                    var currentPage = parseInt(text.split("/")[0] );
                    var next = ((currentPage + 1)* currentSetLength) - 1;
                    var start = currentPage * currentSetLength;
                    var j = 0;
                    for(var i = start; i <= next; j++, i++)
                    {
                       var obj = list[i];
                       try{
                        if(window.matchMedia("(max-width: 768px)").matches)
                        {
                         
                            imgGalleryNodes[j].setAttribute("src", obj["res768"]);
                            imgGalleryNodes[j].setAttribute("srcset", obj["mobile"] + " 290w");
                            imgGalleryNodes[j].setAttribute("sizes", "(max-width: 320px) 290px");
                        }
                        else{
                            imgGalleryNodes[j].setAttribute("src", obj["tablet"]);
                            imgGalleryNodes[j].setAttribute("srcset", obj["res768"] + " 317w");
                        }
                           
                       }
                       catch {

                       }
                    
                    }
    
                    rightBlockPages.innerHTML = (currentPage + 1) + "/" + pages;
                }
            }
            else {
                 imgGalleryNodes = document.querySelectorAll(".picture-img");
                 const currentSetLength = imgGalleryNodes.length;
                 pages = Math.round(list.length / currentSetLength);
                 var rightBlockPages = document.querySelector(".right-block__pages");
                 var text = rightBlockPages.innerHTML;
                 if(text[0] >= 1 && text.split("/")[0] < pages)
                 {
                     var currentPage = parseInt(text.split("/")[0]);
                  
                     var next = ((currentPage + 1)* currentSetLength) - 1;
                     var start = currentPage * currentSetLength;
                     var j = 0;
                     for(var i = start; i <= next; j++, i++)
                     {
                        var obj = list[i];
                       try{
                           imgGalleryNodes[j].setAttribute("src", obj["desktop"]);
                        }
                        catch {

                        }
                     }
     
                     rightBlockPages.innerHTML = (currentPage + 1) + "/" + pages;
                 }
            }

        })
     });

     document.querySelectorAll(".heading-flags__flag").forEach(function(elem){
        
         elem.addEventListener("click", function(e){
             var data = e.currentTarget.dataset.path;
             document.querySelectorAll(".section__catalog-item-wrapper").forEach(function(el){
                 el.classList.remove("section__catalog-item-wrapper-active");
             });
            var active = document.querySelector(`[data-target='${data}']`);
            active.parentElement.classList.add("section__catalog-item-wrapper-active");
            document.querySelectorAll(".heading-flags__flag").forEach(function(el){
                el.style = null;
            });
            var width = e.currentTarget.offsetWidth; 
            var height = e.currentTarget.offsetHeight;
            width += 20;
            height += 20;
            if(window.matchMedia("(max-width: 320px)").matches)
            {
                width = e.currentTarget.offsetWidth; 
                height = e.currentTarget.offsetHeight;
                console.log(width);
                width += 0;
                height += 0;
            }
            e.currentTarget.style.width = width + "px";
            e.currentTarget.style.height = height + "px";
            e.currentTarget.style.backgroundPosition = "center center";
            e.currentTarget.style.border = "2px solid var(--blanchard-border-color-burger-signin)";
       })
     });

     document.querySelector(".section__events-all-btn").addEventListener("click", function(e){
            var eventsCardsList = document.querySelector(".section__events-cards-list");
            eventsCardsList.style.minHeight = "1500px";
            var contrl = true;
            document.querySelectorAll(".section__events-cards-list-item").forEach(function(elem){
                if(elem.offsetHeight == 0)
                {
                    for(var i=0; i<=elem.children.length - 1; i++){
                           if(elem.children[i].classList.contains("section__events-cards-item-scene"))
                           {
                               elem.children[i].style.display = "flex";
                               for(var j = 0; j <= elem.children[i].children.length - 1; j++)
                               {
                                   if(elem.children[i].children[j].classList.contains("section__events-cards-item-content"))
                                   {
                                       if(elem.children[i].children[j].children[0].innerHTML == "")
                                       {
                                           contrl = false;
                                       }
                                       else {
                                           break;
                                       }
                                   }
                               }
                           }
                    }
                 if(contrl) {
                    elem.style.minHeight = "700px";
                    elem.style.height = "100%";
                    elem.style.opacity = "1";
                 }
                }
            })

            e.target.style.display = "none";
     })

     document.querySelectorAll(".list-periods__item-content").forEach(function(elem){
         elem.addEventListener("click", function(e){
             document.querySelectorAll(".list-periods__item-list-artists").forEach(function(el){
                 el.classList.remove("list-artists-active");   
             })
             var el = e.target;
             if(!el.classList.contains("list-periods__item-content"))
             {
                el = e.target.parentElement;
             }

             if(el.nextElementSibling.classList.contains("list-periods__item-list-artists"))
             {
                    el.nextElementSibling.classList.add("list-artists-active");
             }
       
             
         })
     });

     document.querySelectorAll(".list-artists__item").forEach(function(elem){
           elem.addEventListener("click", function(e){
               var f = "json/artists.json";
               readJSONFromFile(f, function(li){
                   var bindNumber = elem.dataset.bindNumber;
                   var list = JSON.parse(li);
                   for(var i = 0; i <= list.length - 1; i++){
                       
                        
                        if(elem.dataset.bindNumber == list[i]["bind-number"])
                        {
                           var parent = elem.parentElement;
                           var region = parent.getAttribute("data-region");

                          if(region == "ru")
                          {
                           var rusPicture = document.querySelector("[data-picture='ru']");
                           var rusHeading = document.querySelector("[data-heading='ru']");
                           var rusDataDate = document.querySelector("[data-date='ru']");
                           var rusParagraph = document.querySelector("[data-paragraph='ru']");
                           
                           var rus = list[i]["rus"];
                           rusName = rus["name"];
                           rusDate = rus["date"];
                           rusText = rus["text"];
                           rusImg = rus["img"];
                           rusSRCSET = rus["srcset"];
                           rusSIZES = rus["sizes"];   

                           rusPicture.setAttribute("src", rusImg);
                           rusPicture.setAttribute("srcset", rusSRCSET);
                           rusPicture.setAttribute("sizes", rusSIZES);
                           rusHeading.innerHTML = rusName;
                           rusDataDate.innerHTML = rusDate;
                           rusParagraph.innerHTML = rusText;
                           rusParagraph.insertBefore(rusDataDate, rusParagraph.firstChild);
                          
                           var def = document.querySelector(".default-link-ru");
                           def.classList.remove("default-link-ru"); 
                           elem.firstElementChild.classList.add("default-link-ru");
                          }
                          
                          if(region == "dt")
                          {
                           var dtPicture = document.querySelector("[data-picture='dt']");
                           var dtHeading = document.querySelector("[data-heading='dt']");
                           var dtDataDate = document.querySelector("[data-date='dt']");
                           var dtParagraph = document.querySelector("[data-paragraph='dt']");
                   
                           var dt = list[i]["dt"];
                           dtName = dt["name"];
                           dtDate = dt["date"];
                           dtText = dt["text"];
                           dtImg = dt["img"];
                           dtSRCSET = dt["srcset"];
                           dtSIZES = dt["sizes"]; 

                           dtPicture.setAttribute("src", dtImg);
                           dtPicture.setAttribute("srcset", dtSRCSET);
                           dtPicture.setAttribute("sizes", dtSIZES);
                           dtHeading.innerHTML = dtName;
                           dtDataDate.innerHTML = dtDate;
                           dtParagraph.innerHTML = dtText;
                           dtParagraph.insertBefore(dtDataDate, dtParagraph.firstChild);

                           var def = document.querySelector(".default-link-dt");
                           def.classList.remove("default-link-dt"); 
                           elem.firstElementChild.classList.add("default-link-dt");
                          }

                          if(region == "fr"){

                           var frPicture = document.querySelector("[data-picture='fr']");
                           var frHeading = document.querySelector("[data-heading='fr']");
                           var frDataDate = document.querySelector("[data-date='fr']");
                           var frParagraph = document.querySelector("[data-paragraph='fr']");
                           
                           var fr = list[i]["fr"];
                           frName = fr["name"];
                           frDate = fr["date"];
                           frText = fr["text"];
                           frImg = fr["img"];
                           frSRCSET = fr["srcset"];
                           frSIZES = fr["sizes"];  

                           frPicture.setAttribute("src", frImg);
                           frPicture.setAttribute("srcset", frSRCSET);
                           frPicture.setAttribute("sizes", frSIZES);
                           frHeading.innerHTML = frName;
                           frDataDate.innerHTML = frDate;
                           frParagraph.innerHTML = frText;
                           frParagraph.insertBefore(frDataDate, frParagraph.firstChild);
                           var def = document.querySelector(".default-link-fr");
                           def.classList.remove("default-link-fr"); 
                           elem.firstElementChild.classList.add("default-link-fr");
                          }
                          if(region == "it"){
                           var itPicture = document.querySelector("[data-picture='it']");
                           var itHeading = document.querySelector("[data-heading='it']");
                           var itDataDate = document.querySelector("[data-date='it']");
                           var itParagraph = document.querySelector("[data-paragraph='it']");

                           var it = list[i]["it"];
                           itName = it["name"];
                           itDate = it["date"];
                           itText = it["text"];
                           itImg = it["img"];
                           itSRCSET = it["srcset"];
                           itSIZES = it["sizes"]; 

                           itPicture.setAttribute("src", itImg);
                           itPicture.setAttribute("srcset", itSRCSET);
                           itPicture.setAttribute("sizes", itSIZES);
                           itHeading.innerHTML = itName;
                           itDataDate.innerHTML = itDate;
                           itParagraph.innerHTML = itText;
                           itParagraph.insertBefore(itDataDate, itParagraph.firstChild);

                           var def = document.querySelector(".default-link-it");
                           def.classList.remove("default-link-it"); 
                           elem.firstElementChild.classList.add("default-link-it");
                          }

                          if(region == "dut"){

                           var dutPicture = document.querySelector("[data-picture='dut']");
                           var dutHeading = document.querySelector("[data-heading='dut']");
                           var dutDataDate = document.querySelector("[data-date='dut']");
                           var dutParagraph = document.querySelector("[data-paragraph='dut']");

                           var dut = list[i]["dut"];
                           dutName = dut["name"];
                           dutDate = dut["date"];
                           dutText = dut["text"];
                           dutImg = dut["img"];
                           dutSRCSET = dut["srcset"];
                           dutSIZES = dut["sizes"]; 

                           dutPicture.setAttribute("src", dutImg);
                           dutPicture.setAttribute("srcset", dutSRCSET);
                           dutPicture.setAttribute("sizes", dutSIZES);
                           dutHeading.innerHTML = dutName;
                           dutDataDate.innerHTML = dutDate;
                           dutParagraph.innerHTML = dutText;
                           dutParagraph.insertBefore(dutDataDate, dutParagraph.firstChild);

                           var def = document.querySelector(".default-link-dut");
                           def.classList.remove("default-link-dut"); 
                           elem.firstElementChild.classList.add("default-link-dut");
                          }

                         
                        }
                   }
               })
           })
     });


})