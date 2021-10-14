const Discord = require("discord.js");
const tokenfile = require("./tokenfile.json");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const money = require("./money.json");
const superagent = require(`superagent`);
const randomPuppy = require(`random-puppy`);

bot.on("ready" , async() => {
    console.log(`${bot.user.username} elindult!`)
    let státuszok = [
        "Prefix: ?",
        "Készítő: Kingston4417",
        "Nézi: Vegas Club Remake"
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "PLAYING"})
    }, 6000)

})

bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    if(!money[message.author.id]) {
        money[message.author.id] = {
            money: 100

        };
    }
    fs.writeFile("./money.json", JSON.stringify(money),  (err) => {
        if(err) console.log(err);
    });
    let selfMoney = money[message.author.id].money;
    if(cmd === `${prefix}money`){
        let profilkep = message.author.displayAvatarURL();

        let MoneyEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setColor("GREEN")
        .addField("Egyenleg", `${selfMoney}FT`)
        .setThumbnail(profilkep)
        
        message.channel.send(MoneyEmbed)

    }
    
        if(cmd === `${prefix}freeMoney`){
            message.channel.setNSFW("600Ft kaptál")
            money[message.author.id] = {
                money: selfMoney + 600
            }
        }
        if(cmd === `${prefix}pay`){
            let pay_Money = Math.round(args[0]*100/100)
            if(isNaN(pay_money)) return message.reply(`A parancs helyes használata: ${prefix}pay <összeg> <@név>`)
            if(pay_money > selfMoney) return message.reply(" az egyenlegednél több pénzt nem adhatsz meg!")

            let pay_user = message.mentions.members.first();

            if(args[1] && pay_user){
                if(!money[pay_user.id]){
                    money[pay_user.id] = {
                        money: 100,
                        used_id:pay_user.id
                    }
                }
                money[pay_user.id] = {
                    money: money[pay_user.id].money + pay_money,
                    user_id: pay_user.id
                }
                money[message.author.id] = {
                    money: selfMoney - pay_money,
                    user_id: message.author.id
                }

                message.channel.send(`Sikeresen átutaltál <@${pay_user.id}> számlájára ${pay_money}FT-ot!`)

                fs.writeFile("./money.json", JSON.stringify(money), (err) =>{
                    if(err) console.log(err);
                });
            } else {
                message.reply(`A parancs helyes használata: ${prefix}pay <összeg> <@név>`)
        }
        }    

        if(cmd === `${prefix}work`){
            let cd_role_id = "897820581339217941";
            let cooldown_time = "10"; //mp

            if(message.member.roles.chace.has(cd_role_id)) return message.reply(`Ezt a parancsot ${cooldown_time} percenként használhatod!`)

            message.member.roles.add(cd_role_id)

            let üzenetek = ["Nice cock!", "Asta kifizetett téged :)!", "Nesze egy kis borravaló, de ne mond el senkinek!"]
            let random_üzenet_szam = Math.floor(Math.random()*üzenetek.length)

            let random_money = Math.floor(Math.random()*1900 +1)

            let workEmbed = new Discord.MessageEmbed()
            .setTitle("Munka")
            .addField(`${üzenetek[random_üzenet_szam]}`, `A számládhoz került: ${random_money}FT!`)
            .setColor("RANDOM")
            .setTimestamp(message.createdAt)
            message.channel.send(workEmbed)
            
            money[message.author.id] = {
                money: selfMoney + random_money,
                user_id: message.author.id
            }
            setTimeout(() => {
                message.member.roles.remove(cd_role.id)
            }, 60000 * cooldown_time)
        }


    if(cmd === `${prefix}köszönj`){
        message.channel.send("Üdvözd létem!")
    
    
    }

    if(cmd === `${prefix}hello`){

        let királyEmbed = new Discord.MessageEmbed
        .setAuthor(message.author.username)
        .setTitle("Asta fanboy")
        .addField("hello")
        .setColor("RANDOM")
        .setFooter(message.createdAt)
        message.channel.send(királyEmbed)
    }
   
        if(cmd === `${prefix}kick`){
            let kick_user = message.mentions.members.first();
            if(args[0] && kick_user){

                if(args[1]){

                        let KickEmbed = new Discord.MessageEmbed()
                        .setTitle("KICK")
                        .setColor("RED")
                        .setDescription(`**Kickelte** ${message.author.tag}\n**Kickelve lett: ${kick_user.user.tag}\n**Kick indoka:** ${args.slice().join(" ")}`)
                
                        message.channel.send(KickEmbed);

                            kick_user.kick(args.slice(1).join(" "));

                } else {
                    let parancsEmbed = new Discord.MessageEmbed()
                    .setTitle("Parancs használata:")
                    .addField(`${prefix}kick <@név> [indok]`)
                    .setDescription("HIBA: Kérlek említs meg egy indokot!!!")
                    .setColor("BLUE")
    
                    message.channel.send(parancsEmbed);
                }
                           
            } else {
                let parancsEmbed = new Discord.MessageEmbed()
                .setTitle("Parancs használata:")
                .addField(`${prefix}kick <@név> [indok]`)
                .setDescription("HIBA: Kérlek említs meg egy embert!!!")
                .setColor("BLUE")

                message.channel.send(parancsEmbed);
            }
        }

      

        
        
        if(cmd === `${prefix}ban`){
            let ban_user = message.mentions.members.first();
            if(args[0] && ban_user){

                if(args[1]){

                        let BanEmbed = new Discord.MessageEmbed()
                        .setTitle("BAN")
                        .setColor("RED")
                        .setDescription(`**Banolta** ${message.author.tag}\n**Banolva lett: ${ban_user.user.tag}\n**Ban indoka:** ${args.slice().join(" ")}`)
                
                        message.channel.send(BanEmbed);

                            ban_user.ban(args.slice(1).join(" "));

                } else {
                    let parancsEmbed = new Discord.MessageEmbed()
                    .setTitle("Parancs használata:")
                    .addField(`${prefix}ban <@név> [indok]`)
                    .setDescription("HIBA: Kérlek említs meg egy indokot!!!")
                    .setColor("BLUE")
    
                    message.channel.send(parancsEmbed);
                }
                           
            } else {
                let heheEmbed = new Discord.MessageEmbed()
                .setTitle("Parancs használata:")
                .addField(`${prefix}ban <@név> [indok]`)
                .setDescription("HIBA: Kérlek említs meg egy embert!!!")
                .setColor("BLUE")

                message.channel.send(heheEmbed);
            }
        }







        if(cmd === `${prefix}cat`){
            let msg = await message.channel.send("*Cecaaa betöltése...*")

            let{body} = await superagent
            .get(`https://aws.random.cat/meow`)

            if(!{body}) return message.channel.send("A kép betöltésekor hiba lépett fel!")

            let catEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .addField("MEOW", ":3")
            .setImage(body.file)
            .setTimestamp(message.createdAt)

            message.channel.send(catEmbed)
        }



        if(cmd === `${prefix}meme`){
            const subreddits = ["dankmeme", "meme", "me_irl"]
            const random = subreddits[Math.floor(Math.random()* subreddits.length)]

            const IMG = await randomPuppy(random)
            const MemeEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(IMG)
            .setTitle(`Keresési szöveg: ${random} {KATT IDE}`)
            .setURL(`https://www.reddit.com/r/${random}`)

            message.channel.send(MemeEmbed)
        }








       
})




fs.writeFile("./money.json", JSON.stringify(money),  (err) => {
    if(err) console.log(err);
});










bot.login(tokenfile.token);


