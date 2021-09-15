import { Component, OnInit } from '@angular/core';
import { UserUpdateDTO } from 'src/app/dto/userUpdateDTO';
import { AuthService } from 'src/app/services/auth.service';
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
  constructor(private usersService: UsersService, private authService: AuthService) { }

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
      userId: this.authService.loggedUser.userId,
      password: this.newPassword,
    }

    this.usersService.update(updatedUser).subscribe();
    alert("Hasło zmienione.")
    
  }
}
