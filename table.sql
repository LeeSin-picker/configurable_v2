
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[vb_chart]') AND type IN ('U'))
	DROP TABLE [dbo].[vb_chart]
GO

CREATE TABLE [dbo].[vb_chart] (
  [vc_ID] int  IDENTITY(1,1) NOT NULL,
  [vc_Code] varchar(50) COLLATE Chinese_PRC_CI_AS  NOT NULL,
  [vc_pageCode] varchar(50) COLLATE Chinese_PRC_CI_AS  NOT NULL,
  [vc_chartType] varchar(50) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_width] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_height] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_Xaxis] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_Yaxis] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_data] varchar(5000) COLLATE Chinese_PRC_CI_AS  NOT NULL,
  [vc_createTime] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_updateTime] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_creater] varchar(50) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_ExParam1] varchar(110) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_ExParam2] varchar(200) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_ExParam3] varchar(200) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_ExParam4] varchar(200) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_ExParam5] varchar(200) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_dataType] varchar(200) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_whType] varchar(50) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_title] varchar(50) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_minX] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_maxX] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_showType] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_namespace] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_method] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_params] varchar(300) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_timer] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_Percent] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_LineTitle] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_XUnit] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_YUnit] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_ExParam6] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_ExParam7] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_ExParam8] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_ExParam9] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL,
  [vc_ExParam10] varchar(220) COLLATE Chinese_PRC_CI_AS  NULL
)
GO

ALTER TABLE [dbo].[vb_chart] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Primary Key structure for table vb_chart
-- ----------------------------
ALTER TABLE [dbo].[vb_chart] ADD CONSTRAINT [PK__chart_pa__1AEF00B4027D5126] PRIMARY KEY CLUSTERED ([vc_ID])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO

