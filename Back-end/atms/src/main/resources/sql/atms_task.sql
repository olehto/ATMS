INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES
  ('2017-03-10 16:38:33', '2017-03-19 12:11:16', 'Analyse domain and make data model', NULL, 'Date model', '1.0', 1,
                          NULL, 2, 1, 2, 1, 2, 1, NULL, NULL, '2017-03-11 16:40:53', '2017-03-14 16:41:42');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES ('2017-04-15 16:38:48', '2017-04-25 12:11:04',
                               'Develop OAuth2 provider to secure REST-services using Spring Security', NULL,
                               'Security', '1.0', 1, NULL, 2, 1, 2, 1, 2, 2, NULL, NULL, '2017-04-16 16:41:53',
        '2017-04-23 16:42:02');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES ('2017-04-18 16:39:03', '2017-04-21 12:10:53', 'Develop interaction with MySQL using Spring Data JPA', NULL,
                               'Connect with dbms', '1.0', 1, NULL, 1, 2, 2, 1, 2, 1, NULL, NULL, '2017-04-18 16:42:09',
        '2017-04-25 16:42:16');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES
  ('2017-05-12 16:39:11', '2017-05-19 12:10:42', 'Develop layer of business logic to work with data from DAO layer ',
                          NULL, 'Business layer', '1.0', 1, NULL, 3, 2, 2, 1, 2, 1, NULL, NULL, '2017-05-14 16:42:28',
   '2017-05-19 16:42:35');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES
  ('2017-04-13 16:39:25', '2017-04-21 12:10:34', 'Develope DAO layer for using data from DB in business layer', NULL,
                          'DAO layer', '1.0', 2, NULL, 2, NULL, 2, 1, 2, 1, NULL, NULL, '2017-04-13 16:42:39',
   '2017-04-24 16:42:48');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES ('2017-04-15 16:39:35', '2017-04-21 12:10:27', 'Develop controllers for REST-API with using Spring MVC', NULL,
                               'REST services', '1.0', 2, NULL, 1, NULL, 2, 1, 2, 1, NULL, NULL, '2017-04-16 16:42:55',
        '2017-04-24 16:43:01');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES
  ('2017-04-25 16:39:50', '2017-04-28 16:38:00', 'Develop services for storage task''s logs', NULL, 'Log saver', '1.0',
                          2, NULL, 2, NULL, 2, 1, 2, 1, NULL, NULL, '2017-04-26 16:43:07', '2017-04-30 16:43:12');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES
  ('2017-04-19 16:40:01', '2017-04-25 16:38:09', 'Develop services for saving documents that attached to task', NULL,
                          'Document saver', '1.0', 2, NULL, 1, NULL, 2, 1, 2, 1, NULL, NULL, '2017-04-20 16:43:22',
   '2017-04-22 16:43:28');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES ('2017-04-16 16:40:07', '2017-04-22 16:38:17', 'Update data model by adding new entities for task''s statistics',
                               NULL, 'Update data model', '1.1', 2, NULL, 3, NULL, 2, 1, 2, 1, NULL, NULL,
        '2017-04-16 16:43:35', '2017-04-25 16:43:41');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES ('2017-04-15 16:40:15', '2017-04-19 16:38:24', 'Update DAO layer for work with new entities', NULL, 'Update DAO',
                               '1.0', 2, NULL, 3, NULL, 2, 1, 2, 1, NULL, NULL, '2017-04-15 16:43:46',
        '2017-04-18 16:43:51');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES ('2017-04-03 17:30:48', '2017-05-03 17:30:55', 'Develop statistics for manage tasks ', NULL, 'Tasks management',
                               '1.0', 1, NULL, 2, NULL, 2, 1, 2, 1, NULL, NULL, '2017-04-06 17:32:41',
        '2017-05-06 17:32:47');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES ('2017-05-05 13:33:49', '2017-06-09 13:34:05',
                               'Fill database for test suitable developer and different kind of diagram', NULL,
                               'Fill database', '1.0', 1, NULL, 2, NULL, 2, 1, 2, 1, NULL, NULL, '2017-05-09 13:37:33',
        '2017-06-03 13:37:44');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES ('2017-04-07 13:48:03', '2017-04-20 13:48:10',
                               'Develop ability to authorize by social networks like Facebook, Github, Google', NULL,
                               'Authorize by social networks', '1.0', 1, NULL, 2, NULL, 2, 1, 2, 1, NULL, NULL,
        '2017-04-07 13:50:25', '2017-04-13 13:50:37');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES ('2017-06-12 13:54:26', '2017-06-20 13:54:33',
                               'Develop ability to choose developer by compare selected task''s description and descriptions of all finished tasks',
                               NULL, 'Choose developer by task''s description', '1.0', 1, NULL, 2, NULL, 2, 1, 2, 1,
        NULL, NULL, '2017-06-13 15:16:33', '2017-06-15 15:16:38');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES ('2017-06-09 15:37:14', '2017-06-11 15:37:17', 'Develop search in tasks by its title and start time', NULL,
                               'Search in tasks', '1.0', 1, NULL, 2, NULL, 2, 1, 2, 1, NULL, NULL,
        '2017-06-09 15:39:08', '2017-06-10 15:39:16');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES ('2017-06-10 15:41:18', '2017-06-13 15:41:22', 'Develop email notifier to developer when task was assign', NULL,
                               'Email notifier', '1.0', 1, NULL, 2, NULL, 2, 1, 2, 1, NULL, NULL, '2017-06-10 15:44:01',
        '2017-06-11 15:44:03');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES
  ('2017-06-12 15:53:08', '2017-06-14 15:53:10', 'Make data dump to share data to different users', NULL, 'Data dump',
                          '1.0', 1, NULL, 2, NULL, 2, 1, 2, 1, NULL, NULL, '2017-06-12 15:54:44',
   '2017-06-13 15:54:47');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES ('2017-06-09 15:57:49', '2017-06-12 15:57:55', 'Develop user lock after 3 unsuccessful try to authorize', NULL,
                               'User lock', '1.0', 1, NULL, 2, NULL, 2, 1, 2, 1, NULL, NULL, '2017-06-10 15:59:49',
        '2017-06-11 15:59:51');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES
  ('2017-06-09 16:02:27', '2017-06-10 16:02:29', 'Update entities according to new data model', NULL, 'Update entities',
                          '1.0', 1, NULL, 2, NULL, 2, 1, 3, 1, NULL, NULL, '2017-06-09 16:03:27',
   '2017-06-09 23:03:29');
INSERT INTO atms.task (date_start, deadline, description, duration, title, version, developer_id, parent_task_id, priority_id, requirement_requirement_id, sprint_id, status_id, type_id, reporter_id, actual_time, estimation_time, assigned_time, close_time)
VALUES ('2017-06-10 16:06:47', '2017-06-12 16:06:51', 'Develop REST-service to get current user', NULL, 'Current user',
                               '1.0', 1, NULL, 2, NULL, 2, 1, 2, 1, NULL, NULL, '2017-06-10 16:07:24',
        '2017-06-14 16:07:31');