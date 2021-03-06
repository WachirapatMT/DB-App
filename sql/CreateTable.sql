-- MySQL Script generated by MySQL Workbench
-- Wed Nov 11 11:37:07 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema nisiter
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema nisiter
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `nisiter` DEFAULT CHARACTER SET utf8 ;
USE `nisiter` ;

-- -----------------------------------------------------
-- Table `nisiter`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nisiter`.`User` ;

CREATE TABLE IF NOT EXISTS `nisiter`.`User` (
  `email` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `birth_date` DATE NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nisiter`.`Employer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nisiter`.`Employer` ;

CREATE TABLE IF NOT EXISTS `nisiter`.`Employer` (
  `employer_email` VARCHAR(255) NOT NULL,
  `company` VARCHAR(255) NULL,
  `position` VARCHAR(255) NULL,
  PRIMARY KEY (`employer_email`),
  CONSTRAINT `Employer_employer_email_fk`
    FOREIGN KEY (`employer_email`)
    REFERENCES `nisiter`.`User` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nisiter`.`Task`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nisiter`.`Task` ;

CREATE TABLE IF NOT EXISTS `nisiter`.`Task` (
  `task_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` MEDIUMTEXT NULL,
  `min_compensation` DECIMAL(10,2) NULL,
  `max_compensation` DECIMAL(10,2) NULL,
  `min_quota` INT NULL,
  `max_quota` INT NULL,
  `current_accepted` INT NULL DEFAULT 0,
  `payment_method` VARCHAR(255) NULL,
  `is_approved` TINYINT NULL,
  `paid_at` DATETIME NULL,
  `gateway_data` JSON NULL,
  `amount` INT NOT NULL DEFAULT 200,
  `employer_email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`task_id`),
  INDEX `fk_Task_Employer1_idx` (`employer_email` ASC) VISIBLE,
  CONSTRAINT `fk_Task_Employer1`
    FOREIGN KEY (`employer_email`)
    REFERENCES `nisiter`.`Employer` (`employer_email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nisiter`.`Student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nisiter`.`Student` ;

CREATE TABLE IF NOT EXISTS `nisiter`.`Student` (
  `student_email` VARCHAR(255) NOT NULL,
  `university` VARCHAR(255) NULL,
  `degree` VARCHAR(255) NULL,
  `faculty` VARCHAR(255) NULL,
  `department` VARCHAR(255) NULL,
  `resume_url` VARCHAR(255) NULL,
  PRIMARY KEY (`student_email`),
  CONSTRAINT `Student_student_email_fk`
    FOREIGN KEY (`student_email`)
    REFERENCES `nisiter`.`User` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nisiter`.`EmployerFieldsOfWork`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nisiter`.`EmployerFieldsOfWork` ;

CREATE TABLE IF NOT EXISTS `nisiter`.`EmployerFieldsOfWork` (
  `employer_email` VARCHAR(255) NOT NULL,
  `field_of_work` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`employer_email`, `field_of_work`),
  INDEX `fk_EmployerFieldsOfWork_Employer1_idx` (`employer_email` ASC) VISIBLE,
  CONSTRAINT `fk_EmployerFieldsOfWork_Employer1`
    FOREIGN KEY (`employer_email`)
    REFERENCES `nisiter`.`Employer` (`employer_email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nisiter`.`Admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nisiter`.`Admin` ;

CREATE TABLE IF NOT EXISTS `nisiter`.`Admin` (
  `email` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nisiter`.`Subtask`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nisiter`.`Subtask` ;

CREATE TABLE IF NOT EXISTS `nisiter`.`Subtask` (
  `task_id` INT NOT NULL,
  `subtask_id` INT NOT NULL,
  PRIMARY KEY (`task_id`, `subtask_id`),
  INDEX `fk_Task_has_Task_Task2_idx` (`subtask_id` ASC) VISIBLE,
  INDEX `fk_Task_has_Task_Task1_idx` (`task_id` ASC) VISIBLE,
  CONSTRAINT `fk_Task_has_Task_Task1`
    FOREIGN KEY (`task_id`)
    REFERENCES `nisiter`.`Task` (`task_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Task_has_Task_Task2`
    FOREIGN KEY (`subtask_id`)
    REFERENCES `nisiter`.`Task` (`task_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nisiter`.`TaskFieldsOfWork`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nisiter`.`TaskFieldsOfWork` ;

CREATE TABLE IF NOT EXISTS `nisiter`.`TaskFieldsOfWork` (
  `task_id` INT NOT NULL,
  `field_of_work` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`task_id`, `field_of_work`),
  INDEX `fk_TaskFieldsOfWork_Task1_idx` (`task_id` ASC) VISIBLE,
  CONSTRAINT `fk_TaskFieldsOfWork_Task1`
    FOREIGN KEY (`task_id`)
    REFERENCES `nisiter`.`Task` (`task_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nisiter`.`TaskAssessment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nisiter`.`TaskAssessment` ;

CREATE TABLE IF NOT EXISTS `nisiter`.`TaskAssessment` (
  `task_id` INT NOT NULL,
  `assessment_id` INT NOT NULL,
  PRIMARY KEY (`task_id`, `assessment_id`),
  INDEX `fk_TaskAssessment_Task1_idx` (`task_id` ASC) VISIBLE,
  CONSTRAINT `fk_TaskAssessment_Task1`
    FOREIGN KEY (`task_id`)
    REFERENCES `nisiter`.`Task` (`task_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nisiter`.`Application`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nisiter`.`Application` ;

CREATE TABLE IF NOT EXISTS `nisiter`.`Application` (
  `application_id` INT NOT NULL AUTO_INCREMENT,
  `information` MEDIUMTEXT NULL,
  `status` VARCHAR(255) NOT NULL DEFAULT 'Pending',
  `student_email` VARCHAR(255) NOT NULL,
  `task_id` INT NOT NULL,
  PRIMARY KEY (`application_id`),
  INDEX `fk_Application_Student1_idx` (`student_email` ASC) VISIBLE,
  INDEX `fk_Application_Task1_idx` (`task_id` ASC) VISIBLE,
  CONSTRAINT `fk_Application_Student1`
    FOREIGN KEY (`student_email`)
    REFERENCES `nisiter`.`Student` (`student_email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Application_Task1`
    FOREIGN KEY (`task_id`)
    REFERENCES `nisiter`.`Task` (`task_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nisiter`.`Review`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nisiter`.`Review` ;

CREATE TABLE IF NOT EXISTS `nisiter`.`Review` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `task_id` INT NOT NULL,
  `student_email` VARCHAR(255) NOT NULL,
  `employer_email` VARCHAR(255) NOT NULL,
  `comment` TEXT NOT NULL,
  `by_student` TINYINT NOT NULL,
  `review_date` DATETIME NOT NULL,
  `rating` INT NOT NULL,
  PRIMARY KEY (`review_id`),
  INDEX `fk_Review_Task1_idx` (`task_id` ASC) VISIBLE,
  INDEX `fk_Review_Student1_idx` (`student_email` ASC) VISIBLE,
  INDEX `fk_Review_Employer1_idx` (`employer_email` ASC) VISIBLE,
  CONSTRAINT `fk_Review_Task1`
    FOREIGN KEY (`task_id`)
    REFERENCES `nisiter`.`Task` (`task_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Review_Student1`
    FOREIGN KEY (`student_email`)
    REFERENCES `nisiter`.`Student` (`student_email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Review_Employer1`
    FOREIGN KEY (`employer_email`)
    REFERENCES `nisiter`.`Employer` (`employer_email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nisiter`.`ChatMessage`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nisiter`.`ChatMessage` ;

CREATE TABLE IF NOT EXISTS `nisiter`.`ChatMessage` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `student_email` VARCHAR(255) NOT NULL,
  `employer_email` VARCHAR(255) NOT NULL,
  `task_id` INT NOT NULL,
  `text` TEXT NOT NULL,
  `sent_at` DATETIME NOT NULL,
  `read_at` DATETIME NULL,
  `sent_by_student` TINYINT NOT NULL,
  PRIMARY KEY (`message_id`),
  INDEX `fk_ChatMessage_Student1_idx` (`student_email` ASC) VISIBLE,
  INDEX `fk_ChatMessage_Employer1_idx` (`employer_email` ASC) VISIBLE,
  INDEX `fk_ChatMessage_Task1_idx` (`task_id` ASC) VISIBLE,
  CONSTRAINT `fk_ChatMessage_Student1`
    FOREIGN KEY (`student_email`)
    REFERENCES `nisiter`.`Student` (`student_email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ChatMessage_Employer1`
    FOREIGN KEY (`employer_email`)
    REFERENCES `nisiter`.`Employer` (`employer_email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ChatMessage_Task1`
    FOREIGN KEY (`task_id`)
    REFERENCES `nisiter`.`Task` (`task_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nisiter`.`StudentAnswer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nisiter`.`StudentAnswer` ;

CREATE TABLE IF NOT EXISTS `nisiter`.`StudentAnswer` (
  `student_email` VARCHAR(255) NOT NULL,
  `choice_id` INT NOT NULL AUTO_INCREMENT,
  `question_id` INT NOT NULL,
  `done_at` DATETIME NOT NULL,
  PRIMARY KEY (`choice_id`, `student_email`),
  INDEX `fk_StudentAnswer_Student1_idx` (`student_email` ASC) VISIBLE,
  CONSTRAINT `fk_StudentAnswer_Student1`
    FOREIGN KEY (`student_email`)
    REFERENCES `nisiter`.`Student` (`student_email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nisiter`.`Notification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nisiter`.`Notification` ;

CREATE TABLE IF NOT EXISTS `nisiter`.`Notification` (
  `notification_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `task_id` INT NOT NULL,
  `text` TEXT NOT NULL,
  `is_read` TINYINT NOT NULL,
  `notified_at` DATETIME NOT NULL,
  PRIMARY KEY (`notification_id`),
  INDEX `fk_Notification_User1_idx` (`email` ASC) VISIBLE,
  INDEX `fk_Notification_Task1_idx` (`task_id` ASC) VISIBLE,
  CONSTRAINT `fk_Notification_User1`
    FOREIGN KEY (`email`)
    REFERENCES `nisiter`.`User` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Notification_Task1`
    FOREIGN KEY (`task_id`)
    REFERENCES `nisiter`.`Task` (`task_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
