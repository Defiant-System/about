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
	<div class="defiant-storage">
		<div class="row-body">
			<div class="panel-left">
				<i class="icon" style="background-image: url(~/icons/defiant-cloud-storage.png);"></i>
			</div>
			<div class="panel-right">
				<h4>Defiant Cloud Storage</h4>
				<h5>948 MB available of 1 GB</h5>
				<div class="disc-chart">
					<div style="width: 53px;"></div>
					<div style="width: 23px;"></div>
					<div style="width: 31px;"></div>
					<div style="width: 43px;"></div>
				</div>

				<br/>
				<xsl:call-template name="mime-groups"/>
				<br/>
				<xsl:call-template name="facets"/>

			</div>
		</div>
	</div>
</xsl:template>


<xsl:template name="mime-groups">
	<xsl:for-each select="//MimeGroups/i">
		<xsl:variable name="size" select="0" />

		<xsl:variable name="final">
		<xsl:call-template name="summerize-mime-groups">
            <xsl:with-param name="node" select="./*"/>
          </xsl:call-template>
      </xsl:variable>

		<xsl:value-of select="@name" /> - 
		<xsl:value-of select="$final" />
		<br/>
	</xsl:for-each>
</xsl:template>


<xsl:template name="summerize-mime-groups">
	<xsl:param name="node"/>
	<xsl:param name="accum" select="0"/>

	<xsl:choose>
		<xsl:when test="$node">
			<xsl:call-template name="summerize-mime-groups">
				<xsl:with-param name="node" select="$node[position() > 1 and not(last())]"/>
				<xsl:with-param name="accum" select="$accum + sum(//FileSystem//i[@kind = $node/@id]/@size)"/>
			</xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="$accum"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>




<xsl:template name="facets">
	<xsl:for-each select="//Mime/i">
		<xsl:value-of select="@name" /> - 
		<xsl:value-of select="count(//FileSystem//i[@kind = current()/@id])" />
		<br/>
	</xsl:for-each>
</xsl:template>



<xsl:template name="defiant-support">
	<div class="defiant-support">
		<div class="row-body">
			defiant-support
		</div>
	</div>
</xsl:template>


<xsl:template name="about-app">
	<div class="about-app">
		<div class="row-body">
			<div class="panel-left">
				<i class="icon" style="background-image: url(/app/ant/icons/app-icon-finder.png);"></i>
			</div>
			<div class="panel-right">
				<h1>Finder</h1>
				<h5>Version <span>1.0</span></h5>

				<div class="details">
					<div class="field-row">
						<div>Author</div>
						<div class="author">Hakan Bilgin</div>
					</div>
					<div class="field-row">
						<div>Size</div>
						<div class="size">14.2 Kb</div>
					</div>
					<div class="field-row">
						<div>Last updated</div>
						<div class="modified">2020-11-23</div>
					</div>
					<div class="field-row">
						<div>License</div>
						<div class="license" data-click="show-license">MIT</div>
					</div>
				</div>
			</div>
		</div>
		<xsl:call-template name="footer-row"/>
	</div>
</xsl:template>


<xsl:template name="app-license">
	<div class="app-license">
		<div class="row-body">
			app-license
		</div>
	</div>
</xsl:template>


<xsl:template name="app-issues">
	<div class="app-issues">
		<div class="row-body">
			app-issues
		</div>
	</div>
</xsl:template>


<xsl:template name="app-source-code">
	<div class="app-source-code">
		<div class="row-body">
			app-source-code
		</div>
	</div>
</xsl:template>


</xsl:stylesheet>
