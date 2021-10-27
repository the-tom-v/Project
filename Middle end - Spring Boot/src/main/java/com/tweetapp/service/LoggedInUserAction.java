package com.tweetapp.service;

import java.util.List;
import java.util.Scanner;

import com.tweetapp.cognizant.Menu;
import com.tweetapp.dao.UserDao;


public class LoggedInUserAction {
	
	public static UserDao user= new UserDao();

	
	public static void postATweet(String username) {
		String tweet ="";
		Scanner scan = new Scanner(System.in);
		do {
			System.out.println("\nPlease enter Tweet message (with less than 150 characters)....");
			tweet = scan.nextLine().trim();
			}
		while(tweet.length() > 150);
		
		boolean status = user.publishTweet(username,tweet);
		if(status) {
			System.out.println("Tweet posted !!");
			return;
		}
		
	}
	
	public static void fetchTweetsByUsername(String username) {
		System.out.println("\n Fetching Tweets..");
		List<String> tweets = user.getAllTweetsByUsername(username);
		if(tweets.size()>0) {
			System.out.println("\n===========================================\n");
			tweets.forEach(System.out::println);
			System.out.println("\n===========================================\n");
		}else {
			System.out.println("There are no tweets!");
		}
		
	}
	
	public static void fetchAllTweets(){
		System.out.println("\n Fetching All Tweets..");
		List<String> tweets = user.getAllTweets();
		if(tweets.size()>0) {
			System.out.println("\n===========================================\n");
			tweets.forEach(System.out::println);
			System.out.println("\n===========================================\n");
		}else {
			System.out.println("There are no tweets!");
		}
	}
	
	public static void fetchAllUsers(){
		System.out.println("\n Getting all users..");
		System.out.println("\n===========================================\n");
		List<String> users = user.getAllUsers();
		users.forEach(System.out::println);
		System.out.println("\n===========================================\n");
	}
	
	public static void resetPassword(String username) {
		System.out.println("\n Resetting password..");
		System.out.println("\n===========================================\n");
		Scanner scan = new Scanner(System.in);
		System.out.println("Enter new password : ");
		String password = scan.nextLine().trim();
		boolean resetStatus = user.resetUserPwd(username, password);
		if(resetStatus) {
			System.out.println("Password Reset successfully completed !!");
		}
		System.out.println("\n===========================================\n");
		
	}
	
	

}
