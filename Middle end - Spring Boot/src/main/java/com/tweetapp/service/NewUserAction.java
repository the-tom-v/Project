package com.tweetapp.service;

import java.util.Scanner;

import com.tweetapp.cognizant.Menu;
import com.tweetapp.dao.UserDao;

public class NewUserAction {
	
	public static UserDao user = new UserDao();
	
	public static void register() {
		Scanner scan = new Scanner(System.in);
		System.out.println("\nRegistering....");
		System.out.println("\nEnter new username : ");
		String username = scan.nextLine().trim();
		System.out.println("Enter new password : ");
		String password = scan.nextLine().trim();
		user.registerUser(username, password);
		
	}
	
	public static String login() {
		Scanner scan = new Scanner(System.in);
		System.out.println("\nLogging In....");
		System.out.println("\nEnter username : ");
		String username = scan.nextLine().trim();
		System.out.println("Enter password : ");
		String password = scan.nextLine().trim();
		if(user.logInUser(username, password)) {
			Menu.isUserLoggedIn=true;
			System.out.println("LoggedIn successfully !!");
			System.out.println("\n===========================================\n");
			return username;
		}
		return null;
	}
	
	public static void forgotPassword() {
		Scanner scan = new Scanner(System.in);
		System.out.println("\nResetting Password..");
		System.out.println("\nEnter username : ");
		String username = scan.nextLine().trim();
		System.out.println("Enter new password : ");
		String password = scan.nextLine().trim();
		boolean resetStatus = user.resetUserPwd(username, password);
		if(resetStatus) {
			System.out.println("Password Reset successfully completed !!");
		}
	}	
	
}
