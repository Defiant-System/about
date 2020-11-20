<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template name="footer-row">
	<div class="row-foot">
		2019-<xsl:value-of select="substring( //details/meta[@name='system']/@buildDate, 1, 4 )" /> © <xsl:value-of select="//details/meta[@name='company']/@value" /> - All Rights Reserverd
	</div>
</xsl:template>


<xsl:template name="about-defiant">
	<div class="about-defiant">
		<div class="row-body">
			<div class="panel-left">
				<i class="icon" style="background-image: url(/res/img/def-logo.webp);"></i>
			</div>
			<div class="panel-right">
				<h1><xsl:value-of select="//details/meta[@name='system']/@value" /></h1>
				<h5>Version <span><xsl:value-of select="//details/meta[@name='system']/@version" /></span></h5>

				<div class="details">
					<div class="field-row">
						<div>Author</div>
						<div class="author"><xsl:value-of select="//details/meta[@name='author']/@value" /></div>
					</div>
					<div class="field-row">
						<div>Last updated</div>
						<div class="modified"><xsl:value-of select="//details/meta[@name='system']/@buildDate" /></div>
					</div>
					<div class="field-row">
						<div>Licensed to</div>
						<div class="modified">User name</div>
					</div>
					<div class="field-row">
						<div>Account type</div>
						<div class="modified">Free</div>
					</div>
				</div>
			</div>
		</div>
		<xsl:call-template name="footer-row"/>
	</div>
</xsl:template>


<xsl:template name="defiant-storage">
	<xsl:variable name="baseDir" select="//FileSystem"></xsl:variable>
	<xsl:variable name="used" select="sum($baseDir//i/@size)"></xsl:variable>
	<xsl:variable name="quota">
		<xsl:call-template name="sys:storage-size">
			<xsl:with-param name="bytes" select="$baseDir/@quota" />
		</xsl:call-template>
	</xsl:variable>
	<xsl:variable name="available">
		<xsl:call-template name="sys:file-size">
			<xsl:with-param name="bytes" select="$baseDir/@quota - $used" />
		</xsl:call-template>
	</xsl:variable>

	<div class="cloud-storages">
		<div class="storage">
			<xsl:call-template name="defiant-storage-item">
				<xsl:with-param name="baseDir" select="//FileSystem"/>
			</xsl:call-template>
			
			<xsl:for-each select="//Settings//block[@id='external-storage']/*">
				<xsl:call-template name="defiant-storage-item">
					<xsl:with-param name="baseDir" select="//*[@name='Mount']/*[@name='Google Drive']"/>
				</xsl:call-template>
			</xsl:for-each>
			
		</div>
	</div>
</xsl:template>


<xsl:template name="defiant-storage-item">
	<xsl:param name="baseDir" select="//FileSystem"/>
	<xsl:variable name="exclude" select="$baseDir/*[@name != 'Mount']"/>
	<xsl:variable name="used" select="sum($exclude//i/@size)"></xsl:variable>
	<xsl:variable name="quota">
		<xsl:call-template name="sys:storage-size">
			<xsl:with-param name="bytes" select="$baseDir/@quota" />
		</xsl:call-template>
	</xsl:variable>
	<xsl:variable name="available">
		<xsl:call-template name="sys:file-size">
			<xsl:with-param name="bytes" select="$baseDir/@quota - $used" />
		</xsl:call-template>
	</xsl:variable>
	<xsl:variable name="name">
		<xsl:choose>
			<xsl:when test="@name"><xsl:value-of select="@name" /></xsl:when>
			<xsl:otherwise>Defiant Cloud Storage</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="icon">
		<xsl:choose>
			<xsl:when test="@icon">icon-<xsl:value-of select="@icon" /></xsl:when>
			<xsl:otherwise>defiant-cloud-storage</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>

	<xsl:if test="@icon"><hr/></xsl:if>

	<div class="row-body">
		<div class="panel-left">
			<i class="icon">
				<xsl:attribute name="style">
					background-image: url(~/icons/<xsl:value-of select="$icon" />.png);
				</xsl:attribute>
			</i>
		</div>
		<div class="panel-right">
			<h4><xsl:value-of select="$name" /></h4>
			<h5>
				<xsl:value-of select="$available" />
				<xsl:text> available of </xsl:text>
				<xsl:value-of select="$quota" />

				<span class="file-count"><xsl:value-of select="count($exclude//i)" /> files</span>
			</h5>
			<xsl:call-template name="sys:disc-bar">
				<xsl:with-param name="base" select="$baseDir" />
				<xsl:with-param name="exclude" select="$baseDir/*[@name != 'Mount']" />
			</xsl:call-template>
		</div>
	</div>
</xsl:template>


<xsl:template name="defiant-support">
	<div class="defiant-support">
		<div class="row-body">
			<div class="panel-left">
				
			</div>
			<div class="panel-right">
				Defiant Resources
			</div>
		</div>
	</div>
</xsl:template>


<xsl:template name="about-app">
	<div class="about-app">
		<div class="row-body">
			<div class="panel-left">
				<i class="icon">
					<xsl:attribute name="style">
						background-image: url(/app/<xsl:value-of select=".//meta[@name='author']/@namespace" />/icons/app-icon-<xsl:value-of select=".//meta[@name='id']/@value" />.png);
					</xsl:attribute>
				</i>
			</div>
			<div class="panel-right">
				<h1><xsl:value-of select=".//meta[@name='title']/@value" /></h1>
				<h5>Version <span><xsl:value-of select=".//meta[@name='title']/@version" /></span></h5>

				<div class="details">
					<div class="field-row">
						<div>Author</div>
						<div class="author"><xsl:value-of select=".//meta[@name='author']/@value" /></div>
					</div>
					<div class="field-row">
						<div>Size</div>
						<div class="size"></div>
					</div>
					<div class="field-row">
						<div>Last updated</div>
						<div class="modified"><xsl:value-of select="@isodate" /></div>
					</div>
					<div class="field-row">
						<div>License</div>
						<div class="license" data-click="show-license">
							<xsl:value-of select=".//meta[@name='license']/@value" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<xsl:call-template name="footer-row"/>
	</div>
</xsl:template>


<xsl:template name="app-license">
	<div class="app-license">
		
		<h2></h2>
		<div class="divider over"></div>
		<div class="license-text"></div>
		<div class="divider under"></div>

	</div>
</xsl:template>


<xsl:template name="app-issues">
	<div class="app-issues">
		<div class="row-body">
			<div class="panel-left">
				
			</div>
			<div class="panel-right">
				Application Issues
			</div>
		</div>
	</div>
</xsl:template>


<xsl:template name="app-source-code">
	<div class="app-source-code">
		<div class="row-body">
			<div class="panel-left">
				
			</div>
			<div class="panel-right">
				Application Source Code
			</div>
		</div>
	</div>
</xsl:template>


</xsl:stylesheet>
