#include <Wire.h>
#include <BH1750.h>
#include <i2cdetect.h>
#include <WiFi.h>
#include "FirebaseESP32.h"

BH1750 lightMeter(0x23);

#define FIREBASE_HOST "https://sunnylux-f4f62-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "3kFKp5dLEmChkDHBM5XvGpiV0a1618b6k5a2sgL5"
#define WIFI_SSID "Flia_Guevara_REP"
#define WIFI_PASSWORD "shadow84745"

FirebaseData firebaseData;
String path = "/sunnylux";

int led=4;

void setup(){

Serial.begin(9600);
Wire.begin();
i2cdetect();
lightMeter.begin();
delay(2000);
pinMode(led,OUTPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("[Wi-Fi]...Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  //Firewall that allows only GET and POST requests
  Firebase.enableClassicRequest(firebaseData, true);


}

void loop() {

uint16_t lux = lightMeter.readLightLevel();
Serial.print("Light: ");
Serial.print(lux);
Serial.println(" lx");
delay(1000);
Firebase.setInt(firebaseData, path + "/lux",lux);

Firebase.getInt(firebaseData, path + "/on_off");
  if(firebaseData.intData()==1){
      Firebase.setString(firebaseData, path + "/luces_casa","Luces encendidas");
      digitalWrite(led,HIGH);
   }else if(firebaseData.intData()==0){
      Firebase.setString(firebaseData, path + "/luces_casa","Luces apagadas");
      digitalWrite(led,LOW);
    }

}
