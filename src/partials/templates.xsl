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
	<xsl:variable name="used" select="sum(//FileSystem//i/@size)"></xsl:variable>
	<xsl:variable name="quota">
		<xsl:call-template name="sys:storage-size">
			<xsl:with-param name="bytes" select="//FileSystem/@quota" />
		</xsl:call-template>
	</xsl:variable>
	<xsl:variable name="available">
		<xsl:call-template name="sys:file-size">
			<xsl:with-param name="bytes" select="//FileSystem/@quota - $used" />
		</xsl:call-template>
	</xsl:variable>

	<div class="cloud-storages">
		<div class="storage">
			<div class="row-body">
				<div class="panel-left">
					<i class="icon" style="background-image: url(~/icons/defiant-cloud-storage.png);"></i>
				</div>
				<div class="panel-right">
					<h4>Defiant Cloud Storage</h4>
					<h5>
						<xsl:value-of select="$available" />
						<xsl:text> available of </xsl:text>
						<xsl:value-of select="$quota" />
					</h5>
					<xsl:call-template name="sys:disc-bar"/>
				</div>
			</div>
			<div class="row-body">
				<div class="panel-left">
					<i class="icon" style="background-image: url(~/icons/icon-google-drive.png);"></i>
				</div>
				<div class="panel-right">
					<h4>Google Drive</h4>
					<h5>
						<xsl:value-of select="$available" />
						<xsl:text> available of </xsl:text>
						<xsl:value-of select="$quota" />
					</h5>
					<xsl:call-template name="sys:disc-bar"/>
				</div>
			</div>
			<div class="row-body">
				<div class="panel-left">
					<i class="icon" style="background-image: url(~/icons/icon-dropbox.png);"></i>
				</div>
				<div class="panel-right">
					<h4>Dropbox</h4>
					<h5>
						<xsl:value-of select="$available" />
						<xsl:text> available of </xsl:text>
						<xsl:value-of select="$quota" />
					</h5>
					<xsl:call-template name="sys:disc-bar"/>
				</div>
			</div>
			<div class="row-body">
				<div class="panel-left">
					<i class="icon" style="background-image: url(~/icons/icon-one-drive.png);"></i>
				</div>
				<div class="panel-right">
					<h4>OneDrive</h4>
					<h5>
						<xsl:value-of select="$available" />
						<xsl:text> available of </xsl:text>
						<xsl:value-of select="$quota" />
					</h5>
					<xsl:call-template name="sys:disc-bar"/>
				</div>
			</div>
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
