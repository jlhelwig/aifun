var brain = require('./node_modules/brain.js');


const trainingData = [
   {
        input: "So I the pleasant grape have pulled from the vine, And yet I languish in great thirst, while others drink the wine.",
        output: { Oxford: 1 }
   },{
       input: "A valiant mind no deadly danger fears",
       output: { Oxford: 1 }
   },
   {
       input: "If women could be fair and yet not fond, Or that their love were firm, not fickle still, I would not marvel that they make men bond By service long to purchase their good will; But when I see how frail those creatures are",
       output: { Oxford: 1 }
   },
   {
       input: "My mind to me a kingdom is.",
       output: { Oxford: 1 }
   },{
       input: "The labouring man that tills the fertile soil,And reaps the harvest fruit, hath not indeed The gain, but pain; and if for all his toil He gets the straw, the lord will have the seed.",
       output: { Oxford: 1 }
   },{
       input: "My Lord Howard was the worst villain that lived in this earth",
       output: { Oxford: 1 }

 },{
     input: "For truth is truth though never so old, and time cannot make that false which was once true",
     output: { Oxford: 1 }

},{
    input: "Faction that ever dwells In court, where wit excels. Hath set defiance: Fortune and Love have sworn, That they were never born Of one alliance.",
    output: { Oxford: 1 }

},{
    input: "The lively lark stretched forth her wing The messenger of Morning bright; And with her cheerful voice did sing The Day's approach, discharging Night; When that Aurora blushing red, Descried the guilt of Thetis' bed. Laradon tan tan, Tedriton teight",
    output: { Oxford: 1 }
},{
    input: "My meaning is to work What wonders love hath wrought, Wherein I muse, why men of wit Have love so dearly bought.",
    output: { Oxford: 1 }
},{
    input: "You speak an infinite deal of nothing.",
    output: { Shakespeare: 1 }
},{
    input: "These violent delights have violent ends And in their triump die, like fire and powder Which, as they kiss, consume",
    output: { Shakespeare: 1 }
},{
    input: "Let me not to the marriage of true minds Admit impediments. Love is not love Which alters when it alteration finds, Or bends with the remover to remove. O no, it is an ever-fixed mark That looks on tempests and is never shaken",
    output: { Shakespeare: 1 }
},{
    input: "To die, to sleep -To sleep, perchance to dream - ay, there's the rub, For in this sleep of death what dreams may come...",
    output: { Shakespeare: 1 }
},{
    input: "With mirth and laughter let old wrinkles come.",
    output: { Shakespeare: 1 }
},{
    input: "Shall I compare thee to a summer's day? Thou art more lovely and more temperate: Rough winds do shake the darling buds of May, And summer's lease hath all too short a date: Sometimes too hot the eye of heaven shines",
    output: { Shakespeare: 1 }
},{
    input: "Conscience doth make cowards of us all.",
    output: { Shakespeare: 1 }
},{
    input: "O serpent heart hid with a flowering face! Did ever a dragon keep so fair a cave? Beautiful tyrant, feind angelical, dove feather raven, wolvish-ravening lamb! Despised substance of devinest show, just opposite to what thou justly seemest - A dammed saint, an honourable villain!",
    output: { Shakespeare: 1 }
},{
    input: "Sweets to the sweet.",
    output: { Shakespeare: 1 }
},{
    input: "This goodly frame, the earth, seems to me a sterile promontory, this most excellent canopy, the air, look you, this brave o'erhanging firmament, this majestical roof fretted with golden fire, why, it appears no other thing to me than a foul and pestilent congregation of vapours.",
    output: { Shakespeare: 1 }
}
,{
    input: "If you tell the truth, you don’t have to remember anything.",
    output: { Twain: 1 }
},{
    input: "The secret of getting ahead is getting started.",
    output: { Twain: 1 }
},{
    input: "Courage is resistance to fear, mastery of fear – not absence of fear.",
    output: { Twain: 1 }
},{
    input: "The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time.",
    output: { Twain: 1 }
},{
    input: "Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.",
    output: { Twain: 1 }
},{
    input: "I have never let my schooling interfere with my education.",
    output: { Twain: 1 }
},{
    input: "The lack of money is the root of all evil.",
    output: { Twain: 1 }
},{
    input: "Never put off till tomorrow what may be done day after tomorrow just as well",
    output: { Twain: 1 }
},{
    input: "Whenever you find yourself on the side of the majority, it is time to pause and reflect.",
    output: { Twain: 1 }
},{
    input: "Don’t go around saying the world owes you a living. The world owes you nothing. It was here first.",
    output: { Twain: 1 }
},{
    input: "Keep away from people who try to belittle your ambitions. Small people always do that, but the really great make you feel that you, too, can become great.",
    output: { Twain: 1 }
}
];

let trainedNet;

function encode(arg) {
   return arg.split('').map(x => (x.charCodeAt(0) / 255));
}

function processTrainingData(data) {
   return data.map(d => {
       return {
           input: encode(d.input),
           output: d.output
       }
   })
}

function train(data) {
   let net = new brain.NeuralNetwork();
   net.train(processTrainingData(data));
   trainedNet = net.toFunction();
   console.log('Finished training...');
};

function execute(input) {
   let results = trainedNet(encode(input));
   let output;
   results.Oxford > results.Shakespeare ? output = 'Oxford' : output = 'Shakespeare';
   return output;
}

train(trainingData);

console.log("it worked!: Results should read: Shakespeare, Twain, Oxford, Shakespeare, Twain. Hidden layers 25, 10, 5");
console.log(execute("All causes shall give way: I am in blood Stepp’d in so far that, should I wade no more, Returning were as tedious as go o’er."));
//shakespeare
console.log(execute("Whenever you find yourself on the side of the majority, it is time to pause and reflect."));
//Twain
console.log(execute("The trickling tears that fall along my cheeks,The secret sighs that show my inward grief, The present pains perforce that Love aye seeks, Bid me renew my cares without relief; In woeful song, in dole display, My pensive heart for to betray."));
//Oxford
console.log(execute("From women's eyes this doctrine I derive: They sparkle still the right Promethean fire; They are the books, the arts, the academes, That show, contain, and nourish all the world."));
//Shakespeare
console.log(execute("The man who does not read has no advantage over the man who cannot read."));
//Twain
