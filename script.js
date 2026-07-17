(function () {
    const QUESTIONS = [
        {
tag:  'Q1 · IMPULSE CHECK',
      prompt: 'How did this item end up in your cart?',
           options: [
        { label: "I've been planning this purchase for a while", value: 0, flag: 'this was already on your list' },
        { label: 'I found it while scrolling, minutes ago', value: 2, flag: 'there was no plan — you just found it' }
      ]
    },
    {
       tag: 'Q2 · DUPLICATE CHECK',
      prompt: 'Do you already own something that does this job?',
      options: [
        { label: "No, there's a genuine gap", value: 0, 
            flag: 'it fills a genuine gap' },
        { label: 'Yes, something similar already works', value: 2, 
            flag: 'you already own something that does this' }
      ]
    },
    {
 tag: 'Q3 . SALES PRESSURE',
prompt:'Is anything on the page pushing you to decide fast?',
      options: [
        { label: "No, I'm browsing at my own pace", value: 0, flag: 'no artificial urgency' },
        { label: 'A countdown, "low stock", or a flash sale', value: 2, flag: 'a countdown or scarcity tactic is pushing the decision' }
      ]
    },
    {
      tag: 'Q4 · AFFORDABILITY',
      prompt: 'Could you pay for this right now without checking your balance?',
      options: [
        { label: 'Yes, without a second thought', value: 0, flag: 'you can afford it without a second thought' },
        { label: "I'd want to check first", value: 1, flag: "you'd need to check your balance first" }
      ]
   },
    {
tag: 'Q5 · 30-DAY TEST',
  prompt: 'Will you still want this in 30 days?',
      options: [
  { label: 'Yes, definitely', value: 0, flag: "you're confident it'll last" },
        { label: "Probably, though I'm not fully certain", value: 1, flag: "you're only half-sure it'll last" },
        { label: 'Honestly, I have no idea', value: 2, flag: "you can't say you'll still want it in a month" }
      ]
    },
    {
tag: 'Q6 · OUTSIDE VIEW',
      prompt: 'If a friend said they were buying this, what would you tell them?',
      options: [
        { label: 'Good for them — smart buy', value: 0, flag: 'a friend would call it a smart buy' },
        { label: '\u2019d gently ask if they needed it', value: 1, flag: 'a friend would ask a few questions first' },
        { label: "I'd tell them to sleep on it", value: 2, flag: 'a friend would tell you to sleep on it' }
      ]
    }
    ];
      const MAX_SCORE = QUESTIONS.reduce(function (sum, q) {
    return sum + Math.max.apply(null, q.options.map(function (o) { return o.value; }));
  }, 0);

 const el = {
    meta: document.getElementById('meta'),
    itemField: document.getElementById('itemField'),
    priceField: document.getElementById('priceField'),
    itemInput: document.getElementById('itemInput'),
    priceInput: document.getElementById('priceInput'),
    tape: document.getElementById('tape'),
    stage: document.getElementById('stage'),
    startBtn: document.getElementById('startBtn'),
    tagline: document.getElementById('tagline'),
    receipt: document.getElementById('receipt')
  };
