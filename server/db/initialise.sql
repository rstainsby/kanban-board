PRAGMA foreign_keys = ON;

CREATE TABLE Boards (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE Columns (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    boardId TEXT NOT NULL,
    FOREIGN KEY (boardId) REFERENCES Boards(id)
);

CREATE TABLE Tasks (
    id TEXT PRIMARY KEY,
    columnId TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (columnId) REFERENCES Columns(id)
);

CREATE TABLE Subtasks (
    id TEXT PRIMARY KEY,
    taskId TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (taskId) REFERENCES Tasks(id)
);

INSERT INTO Boards (id, name) VALUES
    ('557dae2f-f8d3-473c-a86f-80069ec852e3', 'Platform Launch'),
    ('f26b90a1-5d22-41ef-9268-b36126bcded3', 'Marketing Plan'),
    ('43166f9e-1441-448a-8d43-b31dc8b44639', 'Roadmap');

INSERT INTO Columns (id, name, color, boardId) VALUES
    ('ff41b4cb-11a1-48ff-b688-96161369e2b3', 'Todo', '#49C4E5', '557dae2f-f8d3-473c-a86f-80069ec852e3'),
    ('e54a4d74-5d3d-4628-b856-1ee71010de43', 'Doing', '#8471F2', 'UUID1'),
    ('169e3b5f-91be-4443-9523-ec95608047ef', 'Done', '#67E2AE', 'UUID1'),
    ('dd8f12a1-c3b0-4b14-8787-2cf7ef2d28ba', 'Todo', '#49C4E5', 'f26b90a1-5d22-41ef-9268-b36126bcded3'),
    ('ebcbbbba-4195-4335-8264-5ae647653325', 'Doing', '#8471F2', 'UUID2'),
    ('f12b3bc8-03aa-47ca-871c-1c8861acf236', 'Done', '#67E2AE', 'UUID2'),
    ('1658255f-6dd7-4127-9947-3fbee2f3fac6', 'Todo', '#49C4E5', '43166f9e-1441-448a-8d43-b31dc8b44639'),
    ('4f92ab21-7973-4c1d-a08d-bfe9252693c3', 'Doing', '#8471F2', 'UUID3'),
    ('376493be-348f-4bdd-a416-4e998823c7d6', 'Done', '#67E2AE', 'UUID3');

INSERT INTO Tasks (id, columnId, title, description) VALUES
    ('c62d1cd3-10d3-4a30-a9cb-e09ec2ddf2e3', 'ff41b4cb-11a1-48ff-b688-96161369e2b3', 'Set up cloud infrastructure', 'Provision AWS services for deployment'),
    ('0ad4f0f0-7172-4f49-886b-a2e371f89499', 'e54a4d74-5d3d-4628-b856-1ee71010de43', 'Develop authentication module', 'Implement login and signup features'),
    ('8e158cdb-dcc5-472e-ac52-dfe984362ece', 'ff41b4cb-11a1-48ff-b688-96161369e2b3', 'Deploy beta version', 'Release beta for internal testing'),
    ('7982a496-855a-44e6-8cca-042c10a8f55c', 'dd8f12a1-c3b0-4b14-8787-2cf7ef2d28ba', 'Create ad campaign', 'Design and launch a social media ad campaign'),
    ('23087b82-cce1-4a52-88a8-30c6f90f416d', 'ebcbbbba-4195-4335-8264-5ae647653325', 'Write blog posts', 'Publish articles about our product launch'),
    ('d19bb80e-3a93-4da9-8987-feba95e6c6ac', 'dd8f12a1-c3b0-4b14-8787-2cf7ef2d28ba', 'Analyze marketing data', 'Evaluate engagement and optimize ads'),
    ('fe7716c9-b8df-44f2-84a2-efec1d75cb4a', '4f92ab21-7973-4c1d-a08d-bfe9252693c3', 'Define product roadmap', 'Outline key features and milestones'),
    ('ba1215ae-6551-440d-b31e-cd2e563cd4db', '1658255f-6dd7-4127-9947-3fbee2f3fac6', 'Gather user feedback', 'Collect insights from early adopters'),
    ('c17f1cef-53df-4cf5-983b-bfd42b35adcb', '1658255f-6dd7-4127-9947-3fbee2f3fac6', 'Finalize next quarter plan', 'Lock in roadmap for next development cycle');

INSERT INTO Subtasks (id, taskId, description) VALUES
    ('3201e969-1104-4149-8c5b-485dbdf6b26f', 'c62d1cd3-10d3-4a30-a9cb-e09ec2ddf2e3', 'Set up EC2 instances'),
    ('aed1761f-ac1c-419e-bc03-bb85e286ac60', 'c62d1cd3-10d3-4a30-a9cb-e09ec2ddf2e3', 'Configure database connection'),
    ('194d49d7-7705-4ecc-a19a-f20d8e6ca27a', '0ad4f0f0-7172-4f49-886b-a2e371f89499', 'Implement JWT authentication'),
    ('194d49d7-7705-4ecc-a19a-f20d8e6ca27z', '0ad4f0f0-7172-4f49-886b-a2e371f89499', 'Define user types and permissions'),
    ('988c0d89-7701-4509-b4bd-e0a658d22d97', '8e158cdb-dcc5-472e-ac52-dfe984362ece', 'Deploy to staging environment'),
    ('988c0d89-7701-4509-b4bd-e0a658d21es7', '8e158cdb-dcc5-472e-ac52-dfe984362ece', 'Deploy to production environment'),
    ('943c78cb-4df2-4afd-8c8b-f1b25c3cdfec', '7982a496-855a-44e6-8cca-042c10a8f55c', 'Design ad creatives'),
    ('c234f261-46e0-419e-8769-6caba3cac814', '23087b82-cce1-4a52-88a8-30c6f90f416d', 'Research trending topics'),
    ('da396fa8-191e-4b4d-a20a-c658ae3b6671', 'd19bb80e-3a93-4da9-8987-feba95e6c6ac', 'Generate performance reports'),
    ('09bfa8fe-692c-4ad4-af8c-2f74897e4898', 'fe7716c9-b8df-44f2-84a2-efec1d75cb4a', 'Identify core user needs'),
    ('25ee0d09-fdfb-4e54-ad5b-9f3d611935b6', 'ba1215ae-6551-440d-b31e-cd2e563cd4db', 'Conduct user interviews'),
    ('161358f4-24c2-4526-84b6-47fed1ded7ea', 'c17f1cef-53df-4cf5-983b-bfd42b35adcb', 'Prioritize feature backlog');