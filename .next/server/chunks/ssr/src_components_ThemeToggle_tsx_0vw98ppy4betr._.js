module.exports=[79556,a=>{"use strict";var b=a.i(87924),c=a.i(72131);let d=`
  (function() {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      document.documentElement.classList.remove('dark');
    }
  })();
`;a.s(["ThemeScript",0,function(){return(0,b.jsx)("script",{dangerouslySetInnerHTML:{__html:d}})},"default",0,function({className:a=""}){let[d,e]=(0,c.useState)(!1),[f,g]=(0,c.useState)(!1);(0,c.useEffect)(()=>{g(!0);try{let a=localStorage.getItem("theme"),b="dark"===a;e(b),b?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}catch{document.documentElement.classList.remove("dark")}},[]);let h=d?"Activer le mode clair":"Activer le mode sombre";return(0,b.jsx)("button",{type:"button",onClick:()=>{let a=!d;e(a);try{a?(document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light"))}catch{}},"aria-label":h,"aria-pressed":d,className:`fixed top-4 right-4 z-50 flex items-center justify-center w-12 h-12 min-w-touch min-h-touch rounded-full border border-border-control bg-surface text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2 hover:bg-background pt-safe pr-safe ${a}`,title:h,children:f?d?(0,b.jsxs)("svg",{className:"w-5 h-5 stroke-primary",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,b.jsx)("circle",{cx:"12",cy:"12",r:"4"}),(0,b.jsx)("line",{x1:"12",y1:"2",x2:"12",y2:"4"}),(0,b.jsx)("line",{x1:"12",y1:"20",x2:"12",y2:"22"}),(0,b.jsx)("line",{x1:"4.22",y1:"4.22",x2:"5.64",y2:"5.64"}),(0,b.jsx)("line",{x1:"18.36",y1:"18.36",x2:"19.78",y2:"19.78"}),(0,b.jsx)("line",{x1:"1",y1:"12",x2:"3",y2:"12"}),(0,b.jsx)("line",{x1:"21",y1:"12",x2:"23",y2:"12"}),(0,b.jsx)("line",{x1:"4.22",y1:"19.78",x2:"5.64",y2:"18.36"}),(0,b.jsx)("line",{x1:"18.36",y1:"5.64",x2:"19.78",y2:"4.22"})]}):(0,b.jsx)("svg",{className:"w-5 h-5 stroke-primary",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,b.jsx)("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"})}):(0,b.jsx)("span",{className:"w-5 h-5 block","aria-hidden":"true"})})}])}];

//# sourceMappingURL=src_components_ThemeToggle_tsx_0vw98ppy4betr._.js.map