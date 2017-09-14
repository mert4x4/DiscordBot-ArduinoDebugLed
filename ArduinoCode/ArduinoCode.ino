//MERT4X4 DISCORD LED
const uint8_t LedYellow = 10;
const uint8_t LedRed = 11;
void setup() {
  pinMode(LedYellow, OUTPUT);
  pinMode(LedRed, OUTPUT);
  Serial.begin(9600);
  randomSeed(analogRead(0));
}
void Blink(int val, uint8_t delayt)
{
  if (val == 1)  {
    digitalWrite(LedYellow, HIGH);
    digitalWrite(LedRed, LOW);
  }
  else if (val == 2) {
    digitalWrite(LedYellow, LOW);
    digitalWrite(LedRed, HIGH);
  }
  else if (val == 3) {
    digitalWrite(LedYellow, HIGH);
    digitalWrite(LedRed, HIGH);
  }
  else if (val == 4) {
    digitalWrite(LedYellow, LOW);
    digitalWrite(LedRed, LOW);
  }
  delay(delayt);
}
void loop() {
  if (Serial.available() > 0)
  {
    char val = Serial.read();
    if (val == 'R') {
      Blink(2, 0);
      delay(1000);
      Blink(4, 0);
    }
    if (val == 'O') {
      Blink(3, 0);
      delay(1000);
      Blink(4, 0);
    }
    if (val == 'D') {
      char Stop = val;
      char Stop2 = val;
      for (int i = 0; i < 25; i++) {
        Blink(random(1, 4), 100);
        Blink(4, 30);
      }
    }
  }
}



