export const cases = {
 policy:{name:'PolicyCore modernisation',sector:'Northstar Assurance · Insurance',outcome:'Protect policy renewal and accelerate product change',baseline:2400,evidence:[['Service operations','171 tickets / six months','14 P1 · 22 P2 · synthetic snapshot'],['Security review','2 high / critical findings','Remediation owner: CISO'],['Delivery portfolio','2 blocked initiatives','API and data dependencies'],['Commercial review','Renewal in 32 days','Validate termination and notice terms']],options:[
 {id:'stabilise',name:'Stabilise',tag:'Contain immediate exposure',investment:550,transition:120,saving:260,value:90,duration:6,residual:62,execution:22,fit:48,confidence:85},
 {id:'modernise',name:'Modernise',tag:'Incremental platform renewal',investment:1700,transition:300,saving:850,value:500,duration:15,residual:28,execution:45,fit:88,confidence:72},
 {id:'replace',name:'Replace',tag:'Move to a new core platform',investment:3100,transition:650,saving:1100,value:750,duration:27,residual:20,execution:76,fit:94,confidence:58}]},
 service:{name:'Service platform consolidation',sector:'Meridian Manufacturing · Industrial',outcome:'Simplify service operations and reduce tool duplication',baseline:1800,evidence:[['Tool inventory','4 overlapping platforms','32 integrations require mapping'],['Service operations','18% cross-team reassignment','Synthetic service desk assessment'],['Commercial review','3 renewals in 12 months','Exit fees require validation'],['Business capability','9 plants in scope','Plant change windows constrain rollout']],options:[
 {id:'stabilise',name:'Stabilise',tag:'Standardise existing tools',investment:300,transition:90,saving:220,value:70,duration:4,residual:55,execution:20,fit:45,confidence:88},
 {id:'modernise',name:'Modernise',tag:'Consolidate onto one platform',investment:1100,transition:240,saving:650,value:250,duration:12,residual:25,execution:40,fit:90,confidence:76},
 {id:'replace',name:'Replace',tag:'New enterprise service suite',investment:2200,transition:450,saving:780,value:480,duration:21,residual:18,execution:68,fit:92,confidence:60}]},
 digital:{name:'Digital commerce renewal',sector:'Atlas Retail · Consumer',outcome:'Improve checkout resilience and speed of experimentation',baseline:3200,evidence:[['Observability','99.5% checkout availability','Synthetic six-month baseline'],['Engineering','22% failed deployments','Shared release dependencies'],['Commercial','Peak-season change freeze','Migration must avoid Q4'],['Architecture','11 downstream interfaces','Identity and payment are critical']],options:[
 {id:'stabilise',name:'Stabilise',tag:'Resilience and release controls',investment:650,transition:140,saving:320,value:240,duration:5,residual:52,execution:25,fit:55,confidence:82},
 {id:'modernise',name:'Modernise',tag:'Decouple checkout services',investment:2100,transition:400,saving:900,value:900,duration:16,residual:24,execution:48,fit:90,confidence:68},
 {id:'replace',name:'Replace',tag:'Replatform commerce',investment:3800,transition:700,saving:1200,value:1400,duration:25,residual:16,execution:80,fit:96,confidence:52}]}
};
export const defaults={horizon:5,discount:10,realisation:80,overrun:10,delay:0,includeValue:false,budget:3000};
export function calculate(o,a){
 const months=a.horizon*12,delivery=o.duration+a.delay,cost=o.investment*(1+a.overrun/100)+o.transition;
 const benefit=(o.saving+(a.includeValue?o.value:0))*a.realisation/100;
 const rows=Array.from({length:a.horizon+1},(_,year)=>({year,cost:0,benefit:0,net:0,discounted:0,cumulative:0}));
 let cumulative=0,npv=0,totalCost=0,totalBenefit=0,payback=null;
 for(let m=1;m<=months;m++){
 const c=m<=delivery?cost/delivery:0;
 const ramp=Math.max(0,Math.min(1,(m-delivery)/6));
 const b=benefit/12*ramp,net=b-c,prev=cumulative;
 cumulative+=net; const pv=net/Math.pow(1+a.discount/100,m/12);
 if(payback===null&&prev<0&&cumulative>=0&&net>0)payback=m-1+(-prev/net);
 const r=rows[Math.ceil(m/12)];r.cost+=c;r.benefit+=b;r.net+=net;r.discounted+=pv;r.cumulative=cumulative;
 npv+=pv;totalCost+=c;totalBenefit+=b;
 }
 return {npv,cost,totalCost,totalBenefit,net:totalBenefit-totalCost,roi:totalCost?(totalBenefit-totalCost)/totalCost*100:0,payback,rows:rows.slice(1),delivery,remaining:Math.max(0,cost-totalCost),annualBenefit:benefit};
}
export function score(o,r,lens){
 const finance=Math.max(0,Math.min(100,50+r.roi/2));
 const w={balanced:[.35,.25,.25,.15],finance:[.65,.1,.1,.15],resilience:[.15,.55,.15,.15],growth:[.2,.15,.5,.15]}[lens];
 return Math.round(finance*w[0]+(100-o.residual)*w[1]+o.fit*w[2]+(100-o.execution)*w[3]);
}
