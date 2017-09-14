const Discord = require("discord.js");
const client = new Discord.Client();

const fs = require('fs')
const contents = fs.readFileSync("config.json");
const jsonContent = JSON.parse(contents);

const SerialPort = require('serialport');
const arduino = new SerialPort(jsonContent.ComPort, { autoOpen: true });

var songno = 1;

client.on('ready', () => {
  client.user.setGame(jsonContent.Game);
  console.log(`Logged in as ${client.user.tag}!`);

});

client.on('message', msg => {

  function AutoMessage(res,timerms)
  {
    if(msg.content == "loop")
    {
      msg.reply('loop has started...!');
      var interval = setInterval (function () {
        msg.channel.send(res)
      }, 1 * timerms);
    }
  }
  function speak(req,res,SendToArduino,ArduinoText) {
    if(msg.content === req)
    {
      msg.channel.send(res);
      if(SendToArduino === true)
      arduino.write(ArduinoText +"\n");
    }
  }

  AutoMessage("sa geçler!",500000);
  AutoMessage(":poop:",1500000);

  speak('sa','as ' + msg.author.username, false , "");
  speak('merhaba','merhaba ' + msg.author.username, false , "");
  speak('ağla','çıldır ', false , "");
  speak('çıldır','kudur', false , "");
  speak('mert büyük adam','aynen öyle', false , "");
  speak('geldim','hoş geldin', false , "");
  speak('/bot','/çal --------- /dur ----------- /şarkıseç-0le5arasısayı', false , "");
  speak('disco','PARTY TIME!!!!!!!!!!!!!!',true,"D");

  console.log(msg.author.username + ":" + msg.content);
  if(msg.author.username != 'mert4x4') //YOUR ID
  {
    arduino.write("R\n");
  }

  if(msg.content === jsonContent.PlaySongMessage)
  {
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join()
      .then(connection => {
        msg.reply('I have successfully connected to the channel!');
        const dispatcher = connection.playFile('./musics/' + songno + '.mp3');
      })
      .catch(console.log);
    }
    else {
      msg.reply('You need to join a voice channel first!');
    }
  }
  var songname = msg.content.split('-');
  if(songname[0] == jsonContent.SelectSongMessage)
  {

    if(songname[1] > 0 && songname[1] < 15)
    {

      songno = songname[1];
      console.log('seçilen şarkı no:' + songno);
    }
    else
    {
      songno = 1;
      console.log('seçilen şarkı no:' + songno);

    }
  }

  if(msg.content === jsonContent.StopSongMessage)
  {
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.leave();
    }
    else {
      msg.reply('You need to join a voice channel first!');
    }
  }
});


client.on('voiceStateUpdate', dis => {
  console.log(dis.user.username + "has changed his voice state");
  arduino.write("O\n");
});



client.login(jsonContent.Token); 
