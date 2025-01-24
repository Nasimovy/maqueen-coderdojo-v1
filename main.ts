function links_om () {
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 40)
    basic.pause(1000)
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 40)
    basic.pause(1000)
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 40)
    basic.pause(200)
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 40)
    basic.pause(1000)
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
}
function rechts_om () {
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 40)
    basic.pause(1000)
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 40)
    basic.pause(1000)
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 40)
    basic.pause(200)
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 40)
    basic.pause(1000)
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
}
function avoid_object () {
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 100)
}
let row = 0
huskylens.initI2c()
maqueenPlusV2.I2CInit()
huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
huskylens.writeName(1, "sample")
maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
radio.setGroup(1)
let samples = 1
let samplesfound = 0
let samplesmax = 8
huskylens.writeOSD("druk op A om het ", 0, 0)
huskylens.writeOSD("aantal samples ", 164, 0)
huskylens.writeOSD("te definieren", 0, 30)
huskylens.writeOSD("druk op B om te zoek", 0, 100)
huskylens.writeOSD("en", 185, 100)
huskylens.writeOSD("samples " + convertToText(samples), 0, 60)
basic.forever(function () {
    huskylens.writeOSD(convertToText(maqueenPlusV2.readLineSensorData(maqueenPlusV2.MyEnumLineSensor.SensorL2)), 0, 150)
    huskylens.writeOSD(convertToText(input.compassHeading()), 150, 150)
    while (input.buttonIsPressed(Button.A)) {
        if (samples >= samplesmax) {
            samples = 0
        }
        if (samples < samplesmax) {
            samples += 1
            huskylens.writeOSD("samples " + convertToText(samples), 0, 60)
            basic.showNumber(samples)
            basic.pause(500)
        }
    }
    while (input.buttonIsPressed(Button.B)) {
        while (samplesfound <= samples) {
            if (maqueenPlusV2.readLineSensorData(maqueenPlusV2.MyEnumLineSensor.SensorM) < 100) {
                music.setBuiltInSpeakerEnabled(true)
                music.play(music.tonePlayable(262, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
                if (row % 2 == 0) {
                    rechts_om()
                    row += 1
                    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
                    while (maqueenPlusV2.readLineSensorData(maqueenPlusV2.MyEnumLineSensor.SensorL2) > 100 || maqueenPlusV2.readLineSensorData(maqueenPlusV2.MyEnumLineSensor.SensorR2) > 100) {
                        if (maqueenPlusV2.readLineSensorData(maqueenPlusV2.MyEnumLineSensor.SensorL2) < 100) {
                            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
                        } else if (maqueenPlusV2.readLineSensorData(maqueenPlusV2.MyEnumLineSensor.SensorR2) < 100) {
                            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
                        } else {
                            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
                        }
                    }
                } else {
                    links_om()
                    row += 1
                    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
                    while (maqueenPlusV2.readLineSensorData(maqueenPlusV2.MyEnumLineSensor.SensorL2) > 100 || maqueenPlusV2.readLineSensorData(maqueenPlusV2.MyEnumLineSensor.SensorR2) > 100) {
                        if (maqueenPlusV2.readLineSensorData(maqueenPlusV2.MyEnumLineSensor.SensorL2) < 100) {
                            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
                        } else if (maqueenPlusV2.readLineSensorData(maqueenPlusV2.MyEnumLineSensor.SensorR2) < 100) {
                            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
                        } else {
                            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
                        }
                    }
                }
            } else if (false) {
            	
            } else if (false) {
            	
            } else if (false) {
            	
            } else {
                maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
            }
        }
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    }
})
