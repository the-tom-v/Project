package com.tweetapp.cognizant;

import java.util.Scanner;

import com.tweetapp.service.LoggedInUserAction;
import com.tweetapp.service.NewUserAction;

public class Menu {
	
	public static boolean isUserLoggedIn =false;
	public static String loggedUsername = null;
	 
	
	public static void runApplication() {
		Scanner scanner = new Scanner(System.in);
		int result = 0;
		System.out.println("Welcome to TweetApp !\n");
		
		while(result!=4) {
			result = showMainMenu();
			switch(result) {
				case 1: NewUserAction.register(); break;
				case 2: loggedUsername = NewUserAction.login(); break;
				case 3: NewUserAction.forgotPassword(); break;
			}
			if(result == 2 && isUserLoggedIn) {
				int userMenuOption = 0;
				while(isUserLoggedIn) {
					userMenuOption = showLoggedInUserMenu(loggedUsername);
					switch(userMenuOption) {
						case 1: LoggedInUserAction.postATweet(loggedUsername); break;
						case 2: LoggedInUserAction.fetchTweetsByUsername(loggedUsername); break;
						case 3: LoggedInUserAction.fetchAllTweets(); break;
						case 4: LoggedInUserAction.fetchAllUsers(); break;
						case 5: LoggedInUserAction.resetPassword(loggedUsername); break;
						default:isUserLoggedIn = false;
					}
				}
			}
		}
		scanner.close();
		System.out.println("Thanks for using TweetApp !!");
	}
	
	public static int showMainMenu() {
		
		System.out.println("\n========================================"
				+ "\nMenu : \n1. Register"
				+ "\n2. Login"
				+ "\n3. Forgot Password"
				+ "\n4. Exit"
				+ "\n Please select an option to continue");
		
		Scanner scanner =new Scanner(System.in);
		String optionStr = scanner.next();
		try {
			int option = Integer.parseInt(optionStr);
			if(option <=0 && option>=5) {
				throw new NumberFormatException();
			}
			
			return option;			
		}catch(NumberFormatException e) {
			System.out.println("Invalid Option! Please select a valid option");
		}
		return -1;
	}
	
	public  static int showLoggedInUserMenu(String username) {
		System.out.println("Hi "+username+",");
		System.out.println("Menu : \n1. Post a tweet"
				+ "\n2. View my tweets"
				+ "\n3. View all tweets"
				+ "\n4. View All Users"
				+ "\n5. Reset Password"
				+ "\n6. Logout"
				+ "\n Please select an option to continue");
		Scanner scanner = new Scanner(System.in);
		String optionStr = scanner.next();
		try {
			int option = Integer.parseInt(optionStr);
			if(option <=0 && option>=7) {
				throw new NumberFormatException();
			}
			return option;			
		}catch(NumberFormatException e) {
			System.out.println("Invalid Option! Please select a valid option");
		}
		return -1;
	}

}
