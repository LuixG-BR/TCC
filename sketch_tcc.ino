const int potBPM = A0;
const int potMov = A1;

const int led = 7;
const int buzzer = 8;

void setup()
{
  Serial.begin(9600);

  pinMode(led, OUTPUT);
  pinMode(buzzer, OUTPUT);
}

void loop()
{
  int leituraBPM = analogRead(potBPM);

  int leituraMov = analogRead(potMov);

  // converter para bpm
  int bpm = map(leituraBPM, 0, 1023, 40, 180);

  // ==========================
  // SERIAL
  // ==========================

  Serial.print("BPM:");

  Serial.print(bpm);

  Serial.print("|MOV:");

  Serial.println(leituraMov);

  // ==========================
  // ALERTAS
  // ==========================

  if (bpm >= 150 || leituraMov >= 700)
  {
    digitalWrite(led, HIGH);

    tone(buzzer, 2000);

    delay(300);

    digitalWrite(led, LOW);

    noTone(buzzer);
  }

  delay(500);
}