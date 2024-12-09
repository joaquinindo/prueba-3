import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  isSupported = false;
  barcodes: Barcode[] = [];
  processedData: any[] = [];
  attendancePercentage: number = 0;

  constructor(private alertController: AlertController) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }
  
  async scan(): Promise<void> {
    const ress = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();

    if (!ress.available) {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    }

    const granted = await this.requestPermissions();

    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();

    barcodes.forEach((barcode) => {
      this.processQRData(barcode.rawValue);
    });

    this.calculateAttendancePercentage();
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the QR.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  processQRData(qrData: string): void {
    const sections = qrData.split('|');
    const formattedData = {
      Seccion: sections[0],
      Asignatura: sections[1],
      Sala: sections[2],
      Fecha: sections[3],
    };    
  
    this.processedData.unshift(formattedData);
  }

  calculateAttendancePercentage(): void {
    const totalQRs = 5;
    this.attendancePercentage = (this.processedData.length / totalQRs) * 100;
    console.log(`Porcentaje de asistencia: ${this.attendancePercentage}%`);
  }
}

