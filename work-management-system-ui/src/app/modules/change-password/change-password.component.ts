import { Component, OnInit } from '@angular/core';
import { UserUpdateDTO } from 'src/app/dto/userUpdateDTO';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  newPassword: string;
  newPassword2: string;
  oldPassword: string;
  title: string = 'Zmień hasło';
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.newPassword === undefined || this.newPassword2 === undefined || this.oldPassword === undefined)
    {
      alert("Niektóre pola są puste.")
      return;
    }
    else if(this.newPassword != this.newPassword2)
    {
      alert("Nowe hasła muszą być takie same.")
      return;
    }
    else if(this.newPassword === this.oldPassword)
    {
      alert("Nowe hasło musi być różne od starego.")
      return;
    }
    var updatedUser: UserUpdateDTO ={
      password: this.newPassword,
    }

    this.usersService.update(updatedUser);
    alert("Hasło zmienione.")
    
  }
}
